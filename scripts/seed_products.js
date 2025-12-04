const { Produto, sequelize } = require('../models');

function parsePrice(text) {
  if (!text) return 0;
  // remove R$, spaces
  let t = text.replace(/R\$/g, '').trim();
  // replace thousand separators (.) and change decimal comma to dot
  t = t.replace(/\./g, '').replace(/,/g, '.');
  const n = parseFloat(t);
  return Number.isFinite(n) ? n : 0;
}

const products = [
  // Amiri collection
  { nome: 'Camiseta Amiri Bar Logo Black', preco: 'R$ 299,90', colecao: 'Amiri', imagem: 'img amiri/O1CN01pys5f01UCLRqeCq1f__2920992481-0-cib_700x.webp' },
  { nome: 'Moletom Amiri Bandana Bleach', preco: 'R$ 499,90', colecao: 'Amiri', imagem: 'img amiri/Design_sem_nome_5_11zon_700x.webp' },
  { nome: 'Calça Jeans AMIRI Angel Black', preco: 'R$ 599,90', colecao: 'Amiri', imagem: 'img amiri/Sem-Titulo-12525812_700x.webp' },
  { nome: "Boné Amiri Spirit AM Logo Preto", preco: 'R$ 299,90', colecao: 'Amiri', imagem: 'img amiri/Designsemnome_873c81da-c5be-4b75-a1fb-ef45cffe19a5_700x.webp' },
  { nome: 'Camiseta Amiri 22 Football', preco: 'R$ 399,90', colecao: 'Amiri', imagem: 'img amiri/Sem-Titulo-1_b5a0d0da-5fe1-4e81-8e15-cb1ded31b2bc_700x.webp' },
  { nome: "Amiri MA-1 'White Black' 2023", preco: 'R$ 999,90', colecao: 'Amiri', imagem: 'img amiri/Sem-Titulo-1_1e4e8f9b-6f23-4d76-a37a-615719e3acb1_700x.webp' },
  { nome: 'Camiseta Amiri Staggered', preco: 'R$ 399,90', colecao: 'Amiri', imagem: 'img amiri/983d6054_700x.webp' },
  { nome: 'Cinto Amiri Black Logo', preco: 'R$ 249,90', colecao: 'Amiri', imagem: 'img amiri/4_5840c88e-d2dc-4db6-9968-0c246f60e80f_700x.webp' },
  { nome: 'Camiseta Amiri MA Core Logo White', preco: 'R$ 399,90', colecao: 'Amiri', imagem: 'img amiri/Designsemnome_700x.webp' },
  { nome: 'Camiseta Amiri x Wes Lang Solar', preco: 'R$ 299,00', colecao: 'Amiri', imagem: 'img amiri/O1CN017JLM9p1UCLS0edjmD_29209924_700x.webp' },
  { nome: 'Calça Amiri Bandana B-Ball Sweatpants', preco: 'R$ 449,90', colecao: 'Amiri', imagem: 'img amiri/61f02bff_700x.webp' },
  { nome: 'Calça Amiri Jeans Preta', preco: '699,00', colecao: 'Amiri', imagem: 'img amiri/800_2__5_11zon_700x.webp' },

  // Louis Vuitton collection
  { nome: 'Moletom Denim Tears The Cotton', preco: 'R$ 599,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/moletom.webp' },
  { nome: 'Louis Vuitton LV Skate Sneaker Beige', preco: 'R$ 1299,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/Sem-Titulo-12_5871256c-40c8-44ba-85bf-14ca55e4f8ec_700x.webp' },
  { nome: 'Camiseta Louis Vuitton Ready', preco: 'R$ 399,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/1_1_11zon_a73d97a8-397c-4339-8494-ab3aa08b42ad_700x.webp' },
  { nome: 'Gorro Louis Vuitton Gray', preco: 'R$ 299,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/Design_sem_nome_11zon_98a5ed01-7966-4ab1-907f-2cca7c691747_700x.webp' },
  { nome: 'Jaqueta Louis Vuitton Monogram', preco: 'R$ 1899,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/f8422746_2_11zon_700x.webp' },
  { nome: 'Jaqueta Louis Vuitton Bomber', preco: 'R$ 1399,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/d72041d0_700x.webp' },
  { nome: 'Bermuda Louis Vuitton Jeans Denim', preco: 'R$ 599,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/800_3_1__2_11zon_700x.webp' },
  { nome: 'Cinto Louis Vuitton Monogram Preto', preco: 'R$ 249,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/Sem-Titulo-1_9c20a01f-4150-4cb6-af41-e8a6f1f0ebf3_700x.webp' },
  { nome: 'Jaqueta Louis Vuitton Aviator', preco: 'R$ 1.189,00', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/Designsemnome_2_1_36b00ab1-08be-4fd0-bbd4-32b829dba9d2_700x.webp' },
  { nome: 'Bermuda Jeans Louis Vuitton Carpenter', preco: 'R$ 699,00', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/short-louis-vuitton-en-denim-bleu-46259053-1_2_500x.webp' },
  { nome: 'Camiseta Louis Vuitton Jeans', preco: 'R$ 649,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/Design_sem_nome_1_46aa3c3a-2656-4279-926d-3a64ceb88bfa_700x.webp' },
  { nome: 'Mochila Louis Vuitton x Supreme', preco: 'R$ 1.299,90', colecao: 'Louis Vuitton', imagem: 'assest/img Louiz Vuitton/Sem-Titulo-2_5da19dfb-dda0-4f48-a9bc-71a51011a5e3_700x.webp' },
];

async function seed() {
  try {
    for (const p of products) {
      const preco = parsePrice(p.preco);
      const exists = await Produto.findOne({ where: { nome: p.nome } });
      if (exists) {
        await exists.update({ preco, colecao: p.colecao || null, imagem: p.imagem || null });
        console.log('Updated:', p.nome);
      } else {
        await Produto.create({ nome: p.nome, preco, colecao: p.colecao || null, imagem: p.imagem || null });
        console.log('Created:', p.nome);
      }
    }
    console.log('Seeding finished');
  } catch (err) {
    console.error('Seeding error', err && err.stack ? err.stack : err);
  } finally {
    await sequelize.close();
  }
}

seed();
