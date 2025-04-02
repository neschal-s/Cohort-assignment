const fs = require("fs");
const { Command } = require('commander');
const chalk = require('chalk');
const program = new Command();

const path = './todos.txt'; 

const readTodo = () => {
    try {
        const data = fs.readFileSync(path, 'utf-8');
        return data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        else throw error;
    }
};

const saveTodo = (todos) => {
    const data = todos.join('\n');
    fs.writeFileSync(path, data);
};

program
    .name('todo')
    .description('This CLI helps you manage your todo list')
    .version('0.8.0');

program.command('add')
    .description('Add a new todo')
    .argument('<string>', 'The todo to add')
    .action((todo) => {
        let todos = readTodo();
        todos.push(todo);
        saveTodo(todos);
        console.log(chalk.red.bold('Todo added'));
    });

program.command('show')
    .description('Show all todos')
    .action(() => {
        let todos = readTodo();
        if (todos.length === 0) {
            console.log(chalk.yellow('Todo list is empty'));
        } else {
            todos.forEach((element, index) => {
                if (element.startsWith('[completed]')) {
                    console.log(chalk.green(`${index + 1}: ${element}`));
                } else {
                    console.log(chalk.red(`${index + 1}: ${element}`));
                }
            });
        }
    });

program.command('delete')
    .description('Delete the last todo')
    .action(() => {
        let todos = readTodo();
        if (todos.length !== 0) {
            todos.pop();
            console.log(chalk.blue('Last todo deleted'));
            saveTodo(todos);
        } else {
            console.log(chalk.yellow('Todo list is empty'));
        }
    });

program.command('edit')
    .description('Edit an existing todo')
    .argument('<old>', 'The old todo to be replaced')
    .argument('<new>', 'The new todo to replace the old one')
    .action((oldTodo, newTodo) => {
        let todos = readTodo();
        const index = todos.indexOf(oldTodo);
        if (index === -1) {
            console.log(chalk.yellow('Todo not found'));
        } else {
            todos[index] = newTodo;
            saveTodo(todos);
            console.log(chalk.green('Todo updated'));
        }
    });

program.command('complete')
    .description('Mark a todo as complete')
    .argument('<todo>', 'The exact todo name to mark as complete')
    .action((todo) => {
        let todos = readTodo();
        const index = todos.indexOf(todo);
        if (index === -1) {
            console.log(chalk.yellow('Todo not found'));
        } else {
            todos[index] = `[completed] ${todos[index]}`;
            console.log(chalk.green.bold(`Todo marked as complete: ${todos[index]}`));
            saveTodo(todos);
        }
    });

program.parse();
