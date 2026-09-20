"""
GlobalPulse AI - SSRF Protection & URL Whitelist Validator
Prevents backend requests to private networks, loopback addresses, metadata services, and invalid protocols.
"""

import ipaddress
import socket
from urllib.parse import urlparse
from fastapi import HTTPException

ALLOWED_SCHEMES = {"http", "https"}

BLOCKED_IP_NETWORKS = [
    ipaddress.ip_network("127.0.0.0/8"),       # Loopback
    ipaddress.ip_network("10.0.0.0/8"),        # Private Class A
    ipaddress.ip_network("172.16.0.0/12"),     # Private Class B
    ipaddress.ip_network("192.168.0.0/16"),    # Private Class C
    ipaddress.ip_network("169.254.0.0/16"),    # Link-local / Cloud Metadata (169.254.169.254)
    ipaddress.ip_network("0.0.0.0/8"),         # Current network
    ipaddress.ip_network("::1/128"),           # IPv6 Loopback
    ipaddress.ip_network("fc00::/7"),          # IPv6 Unique local
    ipaddress.ip_network("fe80::/10"),         # IPv6 Link-local
]

def validate_outbound_url(url: str) -> str:
    """Validates destination URL against SSRF and private IP reachability."""
    if not url or not isinstance(url, str):
        raise HTTPException(status_code=400, detail="Invalid target URL.")

    parsed = urlparse(url.strip())
    if parsed.scheme.lower() not in ALLOWED_SCHEMES:
        raise HTTPException(status_code=400, detail=f"Scheme '{parsed.scheme}' not allowed. Use http/https.")

    hostname = parsed.hostname
    if not hostname:
        raise HTTPException(status_code=400, detail="Missing hostname in URL.")

    if hostname.lower() in ["localhost", "127.0.0.1", "0.0.0.0", "::1"]:
        raise HTTPException(status_code=403, detail="Access to internal loopback hosts is prohibited.")

    try:
        # Resolve hostname to IP addresses
        addr_info = socket.getaddrinfo(hostname, None)
        for _, _, _, _, sockaddr in addr_info:
            ip_str = sockaddr[0]
            ip_obj = ipaddress.ip_address(ip_str)
            for blocked_net in BLOCKED_IP_NETWORKS:
                if ip_obj in blocked_net:
                    raise HTTPException(status_code=403, detail=f"Destination IP '{ip_str}' is in a restricted network range.")
    except socket.gaierror:
        pass
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"URL validation error: {str(e)}")

    return url.strip()
