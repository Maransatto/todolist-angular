# My Todo List

This is a project intended to show a bit of a state management.

Though I haven't used NgRx, I created the structure of an unidirectional data flow, abstracting the layers into **Presentation Layer**, **Abstraction Layer** and **Core Layer**.

Here is an article from where I learned it before and used it in some real projects:

https://dev-academy.com/angular-architecture-best-practices/#problems-of-scalability-in-front-end

---

## How to test it

1. You should first run `npm install` so that all the dependencies will be installed.

2. You will be able to create a sort of temporary users and they are stored only in a state memory. If you refresh the page, all of the users will be lost. 

3. After creating a user, go to signin page and sign in.

4. After logged in, you will see a todo list and will be able to create new tasks, filter them by name and status, complete tasks to be done, undo the completition or remove the completed ones.

> Take a note: I forced some random erros so that you can have the experience of facing them from a REST API.
---
### Working Hours

- July 21 -> 2:10 PM until 5:13 PM (3:03)
- July 22 -> 9:00 AM until 1:25 PM (4:25)
- July 22 -> 2:50 PM until 3:14 PM (0:24)
- July 22 -> 3:45 PM until 5:10 PM (1:25)
- July 22 -> 11:20 PM until July 23 1:50 AM (2:30)

> Total Time Spent: 11:47

---

### Starting with NgRx

- August 16 -> 8:29 PM until August 17 1:55 AM (5:26)

> I've spent a few hours trying to find out this error, unfortunately: https://github.com/Maransatto/todolist-angular/commit/1e83cd2036b06e446e5a001bb2bfdee835378771

- August 17 -> 08:30 AM until 09:50 AM (1:20)
- August 17 -> 10:30 AM until 12:40 (2:10)

> For now I have migrated all Todo feature to NgRx instead of managing the state manually. But the Auth Feature has still the old structure.

I recommend to check the progress by the commit history.