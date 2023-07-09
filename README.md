![Desert Llama](/frontend/public/desert-llama-log.png)

# Desert Llama
This repo contains the code for the a toy project called Desert Llama that is a simple web app to interact with the Llama lanuage model. The code is split into two parts: the backend and the frontend. The backend is written in Python and FastAPI. The frontend is written in Javascript using React and Next.js.

## Setup

### Backend

You will need to the models weights downloaded and placed in the `backend/models` directory. You can download the weights from [here](https://huggingface.co/TheBloke/LLaMa-7B-GGML).

Inside the `backend` directory you can set the path to the model on this line in `main.py`:
```python
llm = Llama(model_path="./models/7B/ggml-model-Q4_0.bin")
```

Create python virtual environment
```bash
source env.sh
```

### Frontend
```bash
cd frontend
npm install
```

```bash
npm run dev
```

