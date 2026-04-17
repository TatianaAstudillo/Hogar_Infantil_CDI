import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import { verificarToken } from './src/middlewars/token.js';
import authRoutes from './src/routes/login/auth.routes.js';
import usuarioRoutes from './src/routes/usuario/usuario.routes.js';
import menorRoutes from './src/routes/menor/menor.routes.js';
import productoRoutes from './src/routes/producto/producto.route.js';
import movimientoRoutes from './src/routes/movimiento/movimiento.routes.js';
import donanteRoutes from './src/routes/donante/donante.routes.js';
import donacionRoutes from './src/routes/donacion/donacion.routes.js';
import historialRoutes from './src/routes/historial_medico/historial.route.js';
import seguimientoRoutes from './src/routes/seguimiento_menor/seguimiento.routes.js';
import asignacionRoutes from './src/routes/asignacion_profesora_menor/asignacion_menor.controllers.js';
import dashboardRoutes from "./src/routes/dashboard/dashboard.routes.js";
import profesoras from "./src/routes/profesora/profesora.routes.js"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/usuario',verificarToken, usuarioRoutes);
app.use('/api/menor',verificarToken, menorRoutes);
app.use('/api/producto', verificarToken,productoRoutes);
app.use('/api/movimiento', verificarToken,movimientoRoutes);
app.use('/api/donante',verificarToken, donanteRoutes);
app.use('/api/donacion',verificarToken, donacionRoutes);
app.use('/api/historial',verificarToken, historialRoutes);
app.use('/api/seguimiento',verificarToken, seguimientoRoutes);
app.use('/api/asignacion',verificarToken, asignacionRoutes);
app.use("/api/dashboard", verificarToken, dashboardRoutes);
app.use("/api/profesora", profesoras);


export default app;

