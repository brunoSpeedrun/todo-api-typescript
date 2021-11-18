
# Todo Api

Uma Api que fornece operações CRUD para um Todo


## Todo

| Campo | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | Id da tarefa  |
| `description` | `string` | Descrição da tarefa  |
| `completed` | `boolean` | Flag indicando se a task foi concluída  |
| `createdAt` | `Date` | Data de criação da task  |

## REST

O Desafio é criar um endpoint REST para cada uma das operações listadas

- Listar Todos
- Obter Todo por id
- Criar um Todo
- Atualizar um Todo
- Remover um Todo

Para as operações de `Criar um Todo` e `Atualizar um Todo` considerar o seguinte payload como exemplo

```json 
{
    "description": "Task 1"
}
```

somente o campo `description` será utilizado.