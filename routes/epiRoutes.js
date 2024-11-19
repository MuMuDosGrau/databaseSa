import express from 'express';
import { 
  cadastrarEPI, 
  listarEPI, 
  removerEPI, 
  cadastrarFuncionario, 
  listarFuncionario, 
  removerFuncionario, 
  registrarRetirada, 
  registrarDevolucao, 
  mostrarRetiradas, 
  mostrarDevolucoes, 
  exibirHistorico 
} from '../Controllers/Epi.js';

const router = express.Router();

router.post('/epi/cadastrar', cadastrarEPI);
router.get('/epi/listar', listarEPI);
router.delete('/epi/remover', removerEPI); 

router.post('/funcionario/cadastrar', cadastrarFuncionario);
router.get('/funcionario/listar', listarFuncionario);
router.delete('/funcionario/remover', removerFuncionario);

router.post('/historico/registrarRetirada', registrarRetirada);
router.post('/historico/registrarDevolucao', registrarDevolucao);

router.get('/historico/retiradas', mostrarRetiradas);
router.get('/historico/devolucoes', mostrarDevolucoes);
router.get('/historico', exibirHistorico);

export default router;
