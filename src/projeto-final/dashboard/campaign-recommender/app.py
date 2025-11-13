from fastapi import FastAPI
from pydantic import BaseModel
import joblib

model = joblib.load("modelo.pkl")

app = FastAPI()

class Cliente(BaseModel):
    id: str
    nome: str
    cidade: str
    total_pedidos: int
    valor_medio: float
    horario: str
    nps: int

@app.post("/recomendar")
def recomendar(cliente: Cliente):
    # Previsão com o modelo
    X = [[cliente.total_pedidos, cliente.valor_medio, cliente.nps]]
    horario_previsto = model.predict(X)[0]

    campanhas = []

    if horario_previsto == "noite":
        campanhas.append("🌙 Campanha noturna: 20% off em pratos quentes após as 18h.")

    elif horario_previsto == "tarde":
        campanhas.append("☀️ Promoção de almoço: combo executivo com sobremesa grátis.")

    elif horario_previsto == "manhã":
        campanhas.append("🌅 Café da manhã especial: leve 2, pague 1 em bebidas quentes.")

    if cliente.nps >= 9:
        campanhas.append(f"🎉 {cliente.nome}, você é um promotor! Ganhe R$10 de crédito por indicar amigos.")

    if cliente.valor_medio > 80:
        campanhas.append("💎 Clientes premium têm acesso antecipado ao novo cardápio gourmet.")

    return campanhas[:3]
