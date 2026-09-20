"""
GlobalPulse AI - Interactive Weekly Current Events Quiz Generator
"""

from typing import List, Dict, Any

def generate_weekly_news_quiz() -> Dict[str, Any]:
    """Generates an interactive 5-question current events challenge with explanations."""
    return {
        "quiz_id": "weekly-challenge-current",
        "title": "GlobalPulse World News IQ Challenge",
        "description": "Test your grasp of this week's most critical global geopolitical, scientific, and economic milestones.",
        "questions": [
            {
                "id": "q1",
                "question": "What historic milestone was achieved in global clean energy financing according to recent international agency reports?",
                "options": [
                    "Clean energy investment reached $2 Trillion annually",
                    "Global coal usage increased by 50%",
                    "Solar panel production ceased in Asia",
                    "Offshore wind subsidies were universally cancelled"
                ],
                "correct_index": 0,
                "explanation": "International energy data confirmed global clean energy investment crossed the landmark $2 Trillion threshold, driven by solar, wind, and battery storage.",
                "source": "Reuters & IEA Annual Dispatch"
            },
            {
                "id": "q2",
                "question": "Which astronomical observatory reported groundbreaking spectrographic biomarker data on exoplanet K2-18b?",
                "options": [
                    "Hubble Space Telescope",
                    "James Webb Space Telescope (JWST)",
                    "Arecibo Observatory",
                    "Very Large Telescope (VLT)"
                ],
                "correct_index": 1,
                "explanation": "JWST detected carbon-bearing compounds including methane and carbon dioxide in the atmosphere of K2-18b.",
                "source": "NASA & Nature Astrophysics"
            },
            {
                "id": "q3",
                "question": "What primary advantage do optical neural processors have over traditional silicon GPUs for frontier AI?",
                "options": [
                    "They use mechanical gears",
                    "50x energy efficiency improvement via photonics",
                    "They do not require electricity",
                    "They only work in zero gravity"
                ],
                "correct_index": 1,
                "explanation": "Photonic/optical computing uses light waves to perform matrix multiplications, dramatically reducing electrical heat and energy consumption.",
                "source": "MIT Technology Review"
            },
            {
                "id": "q4",
                "question": "What is the primary objective of the cross-border digital settlement framework established by central banks?",
                "options": [
                    "Abolish paper currency worldwide within 24 hours",
                    "Reduce international settlement times from days to milliseconds",
                    "Prohibit trade between European and Asian nations",
                    "Create a single global bank"
                ],
                "correct_index": 1,
                "explanation": "Interoperability protocols aim to eliminate multi-day correspondent banking friction for global trade.",
                "source": "Financial Times & BIS Report"
            },
            {
                "id": "q5",
                "question": "Why are Tier-1 wire services like Reuters and AP considered the gold standard of neutral reporting?",
                "options": [
                    "They publish opinion editorials only",
                    "They rely strictly on multi-source verification and factual primary dispatches",
                    "They are funded exclusively by private venture funds",
                    "They only cover entertainment news"
                ],
                "correct_index": 1,
                "explanation": "Global wire services adhere to strict two-source corroboration and objective factual transmission standards without editorial opinion bias.",
                "source": "GlobalPulse Transparency Index"
            }
        ]
    }
