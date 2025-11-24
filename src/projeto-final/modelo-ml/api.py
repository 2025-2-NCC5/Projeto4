from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Cliente(BaseModel):
    id: str
    nome: str
    cidade: str | None = None
    total_pedidos: int
    valor_medio: float
    horario: str
    nps: int

@app.post("/recomendar")
def recomendar(cliente: Cliente):
    campanhas: List[str] = []

    # Regras específicas
    if cliente.total_pedidos == 0:
        campanhas.append(f"🎉 Olá {cliente.nome}! Primeira compra? Ganhe 20% de desconto no seu pedido hoje!")
    elif cliente.total_pedidos > 10:
        campanhas.append(f"🔥 {cliente.nome}, você é VIP! Aproveite nossa campanha de fidelidade com brindes exclusivos.")

    if cliente.valor_medio > 80:
        campanhas.append("💎 Campanha Premium: pedidos acima de R$80 ganham sobremesa grátis.")
    elif cliente.valor_medio < 30:
        campanhas.append("🍔 Promoção econômica: combos especiais a partir de R$25.")

    if cliente.nps < 7:
        campanhas.append("🙁 Sentimos que sua experiência não foi perfeita. Participe da campanha de melhoria e ganhe cupom de R$10.")
    else:
        campanhas.append("😊 Obrigado pela ótima avaliação! Você desbloqueou nossa campanha de clientes satisfeitos.")

    if cliente.horario == "manhã":
        campanhas.append("☕ Bom dia! Campanha Café da Manhã: compre 1 pão de queijo e leve 2.")
    elif cliente.horario == "tarde":
        campanhas.append("🍽️ Hora do almoço! Campanha Almoço Especial: prato principal + bebida por R$35.")
    else:
        campanhas.append("🌙 Campanha Jantar Gourmet: pratos selecionados com 15% OFF.")

    return {"campanhas": campanhas}
