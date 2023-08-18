import subprocess

def modify_ormconfig():
    # Leer el archivo original
    with open("API/ormconfig.js", "r") as file:
        content = file.read()

    # Reemplazar los valores
    content = content.replace('username: "tdwopurxv5vsnyyr721q"', 'username: "7sw3mwx4rcri2uv07zah"')
    content = content.replace('password: "pscale_pw_rGLGvRHVYemkHzBDhOXbQYqR2AIcIZsEe7aCJMSFMbq"', 'password: "pscale_pw_aUGWHH6UgrNDvSSglNXKi2NKx4we2wmI98ei2WHv2Om"')

    # Escribir el contenido modificado de nuevo al archivo
    with open("API/ormconfig.js", "w") as file:
        file.write(content)

def execute_cmd(cmds, wait=False):
    # Abrir una nueva terminal CMD y ejecutar los comandos
    process = subprocess.Popen(["cmd", "/k", " && ".join(cmds)])
    if wait:
        process.wait()

def main():
    # Modificar el archivo ormconfig.js
    modify_ormconfig()

    # Levantar la primera terminal CMD y ejecutar los comandos
    execute_cmd(["cd API", "npm i", "npm run dev"])

    # Levantar la segunda terminal CMD y ejecutar los comandos
    execute_cmd(["cd react_app", "npm i", "npm start"], wait=True)

if __name__ == "__main__":
    main()
