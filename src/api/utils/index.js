import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath (import.meta.url); //para obtener el nombre de archivo actual

const __dirname = join(dirname(__filename), "../../../") //obtiene el directorio del archivo actual
//apunta a la raiz del proyecto

export{
    __dirname,
    join
}
