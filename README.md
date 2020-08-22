# ToDoList
## Installation

To successfully run this project locally you need:
- Node.js 12.16.3
- NPM 6.14.4

# Requests
```
mutation{updateTaskStatus(id){
    name,
    status
}}

mutation{createTask(data: {name,  status: ToDo | Done}){
    name,
    status
}}

mutation{deleteTask(id)}

query{Tasks{
    id,
    name,
    status
}}

query{
    Task(id) {
        name,
        status
    }
}
```

## NPM scripts

- `start` - bootstrap builded to Javascript Node application
- `dev` - will run `ts-node-dev` which will restart node process when any of project files will be changed
- `build` - will run Typescript Compiler `tsc` with argumets from `tsconfig.js` in order to compile modern Typescript code to Javascript
