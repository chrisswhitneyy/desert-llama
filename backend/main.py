from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llama_cpp import Llama

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = Llama(model_path="./models/7B/ggml-model-Q4_0.bin")

class InferenceRequest(BaseModel):
    prompt: str

@app.post("/complete")
def perform_inference(request: InferenceRequest):
    output = llm(
        request.prompt,
        max_tokens=48,
        stop=["Q:", "\n"],
        echo=True,
    )
    return {"data": output}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
