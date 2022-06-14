<div align="center">
  <img alt="Logo" src="https://user-images.githubusercontent.com/71351196/149496320-5d85d0b0-2941-4bab-9726-e0ab2f70866a.png" width="100" />
</div>
<h1 align="center">
  Assessment Employee Dashboard
</h1>
<p align="center">
a web application that is used to manage employee data by being able to make several changes to data including add, edit, and delete.
</p>
<p align="center">
  This web application can only store temporary data because it only uses <a href="https://www.npmjs.com/package/json-server" target="_blank">Json-server</a> as its data and build with <a href="https://angular.io/">Angular</a>.
</p>

![demo](https://user-images.githubusercontent.com/71351196/173577153-bc7c29dc-3543-4da5-a5c4-11d6de512369.png)

## 🛠 How To Use, Installation & Set Up

From your command line, first clone v2-id:

```bash
# Clone the repository
$ git clone https://github.com/id-prawito/asssessment-employee.git

# Move into the repository
$ cd assessment-employee

# Install node_modules
$ npm install
```

After that, you can install the dependencies either using NPM or Yarn.

Using NPM: Simply run the below commands.

```bash
# Install dependencies
$ npm install

# Start the development server
$ ng serve
```

This project use json-server for data, and you can run:

```bash
# Install json-server
$ npm i -g json-server

# Start json-server
$ json-server --watch db.json
```

**NOTE**:
If your run into issues installing the dependencies with NPM, use this below command:

```bash
# Install dependencies with all permissions
$ sudo npm install --unsafe-perm=true --allow-root
```

---
