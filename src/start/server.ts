import app from '../infra/http/expres-adapter'; // Corrigido o caminho do import


const port = parseInt(process.env.APP_PORT as string) || 3002;


app.listen(port, () => {
  console.log('\x1b[33m%s\x1b[0m', `=> 🚀 Server running on the port: ${port}`);
});