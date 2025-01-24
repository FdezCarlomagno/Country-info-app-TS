import dotenv from 'dotenv';

// Configurar dotenv para cargar variables del archivo `.env`.
dotenv.config();

// Exporta para garantizar que las variables se cargan antes de cualquier otro código.
export default process.env;
