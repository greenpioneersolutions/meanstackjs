File Naming Structure
-----------------

### Modules

We have implemented modules with a specific file naming convention for server & client side coding. Each module has a unique such as `blog`. Inside of each module you specific files named as such `UNIQUE_NAME.FILE_TYPE_IDENTIFIER.FILE_EXTENSION` 

### Available Keywords to use for `FILE_TYPE_IDENTIFIER`

| FRONTEND                                | BACKEND                                                  |
| ----------------------------------  | ------------------------------------------------------------ |
| `module` | `models` |
| `controller` | `controller` |
| `routes` | `routes` |
| `config` | `spec` |
| `service` | |
| `provider` | |
| `directive` | |
| `style` | |
| `json` | |
| `view` | |
| `spec` | |

Once everything is set up properly we then register all modules and all of its content appropriately on `server.js` startup. 


Examples on the frontend include :

- `blog.controller.js`
- `email.controller.js`
- `blog.factory.js`
- `auth.factory.js`
- `blog.module.js`
- `blog.routes.js.js`
- `blog.spec.css`
- `blog.style.css`
- `blog.style.scss`
- `list.style.less`
- `create.view.html`

Examples on the backend  include :

- `blog.controller.js`
- `blog.model.js`
- `blog.routes.js`
- `blog.spec.js`

