import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  description: string;
  completed: boolean;
  createdAt: Date;
};

export class TodoService {
  private todos: Todo[] = [
    {
      id: "722b5176-216a-4eb5-8afd-77000a0a232e",
      description: "Task 1",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "6e1550d4-e389-49e5-a2da-a2a787ffefde",
      description: "Task 2",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: "c511eb46-50d9-4234-8248-7405604bda9a",
      description: "Task 3",
      completed: false,
      createdAt: new Date(),
    },
  ];

  find(): Promise<Todo[]> {
    return this.simulateNetwork<Todo[]>(() => Promise.resolve([...this.todos]));
  }

  findById(id: string): Promise<Todo | undefined> {
    return this.simulateNetwork<Todo | undefined>(
      () =>
        new Promise((resolve) => {
          const todo = this.todos.find((t) => t.id == id);

          return resolve(todo);
        })
    );
  }

  create(todo: Todo): Promise<Todo> {
    return this.simulateNetwork<Todo>(
      () =>
        new Promise((resolve) => {
          todo.id = uuidv4();
          todo.createdAt = new Date();
          todo.completed = false;
          this.todos.push(todo);

          return resolve({ ...todo });
        })
    );
  }

  remove(id: string): Promise<boolean> {
    return this.simulateNetwork<boolean>(
      () =>
        new Promise((resolve) => {
          const oldLength = this.todos.length;
          this.todos = this.todos.filter((t) => t.id != id);
          const length = this.todos.length;

          const deleted = length < oldLength;
          return resolve(deleted);
        })
    );
  }

  update(todo: Todo, id: string): Promise<Todo | null> {
    return this.simulateNetwork<Todo | null>(
      () =>
        new Promise((resolve) => {
          const index = this.todos.findIndex((t) => t.id == id);
          if (index == -1) {
            return resolve(null);
          }
          this.todos[index] = { ...this.todos[index], ...todo, id };

          return resolve({ ...this.todos[index] });
        })
    );
  }

  simulateNetwork<T>(fn: () => Promise<T>) {
    const shouldFail = Math.random() < 0.3;
    return shouldFail
      ? Promise.reject({ status: 503, message: "Service Unavailable" })
      : fn();
  }
}
