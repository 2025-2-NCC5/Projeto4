import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("data.csv")

X = df[["total_pedidos", "valor_medio", "nps"]]
y = df["horario"]  # ou outro rótulo futuro

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "modelo.pkl")
print("Modelo treinado e salvo como modelo.pkl")
