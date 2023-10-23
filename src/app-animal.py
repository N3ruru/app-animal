from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4

app = FastAPI()

class Animal(BaseModel):
   id: Optional[str] = None
   nome: str
   idade: int
   sexo: str
   cor: str

banco: List[Animal] = []

@app.get('/animais')
def listar_animais():
   return banco

@app.get('/animais/{animal_id}')
def obter_animal(animal_id):
   for animal in banco:
      if animal.id == animal_id:
         return animal
   return {'erro': 'Animal não localizado'}

@app.post('/animais')
def criar_animal(animal: Animal):
   animal.id = str(uuid4())
   banco.append(animal)
   return None


@app.delete('/animais/{animal_id}')
def remover_animal(animal_id):
   for index, animal in enumerate(banco):
      if animal.id == animal_id:
         del banco[index]
         return {'msg': 'Animal removido com sucesso'}
   return {'erro': 'Animal não localizado'}