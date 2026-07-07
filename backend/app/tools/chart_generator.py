import json
from langchain_core.tools import tool

@tool
def generate_chart(query_result: str) -> str:
    spec = {
        "should_render_chart": True,
        "explanation": "The following chart is generated based on the query result.",
        "type": "bar"
    }
    return json.dumps(spec)