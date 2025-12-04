// Script para criar admin corretamente
const { Cliente } = require('../models');

async function createAdmin() {
  try {
    // Deletar admin anterior se existir
    await Cliente.destroy({ where: { email: 'admin@fireblend.com' } });
    console.log('✓ Admin anterior deletado (se existia)');

    // Criar novo admin com role='admin' e senha plaintext
    const admin = await Cliente.create({
      nome: 'Admin',
      telefone: '0',
      endereco: 'x',
      cpf: 'x',
      email: 'admin@fireblend.com',
      senha: 'admin123',  // plaintext, conforme configuração do projeto
      role: 'admin'
    });

    console.log('✓ Admin criado com sucesso:');
    console.log('  Email:', admin.email);
    console.log('  Role:', admin.role);
    console.log('  Senha:', admin.senha);
    console.log('');
    console.log('Para fazer login no admin:');
    console.log('  URL: http://localhost:3000/admin.html');
    console.log('  Email: admin@fireblend.com');
    console.log('  Senha: admin123');

    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar admin:', err.message);
    process.exit(1);
  }
}

createAdmin();
