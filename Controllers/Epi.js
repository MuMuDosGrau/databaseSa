import EPI from '../models/Epi.js';
import Funcionario from '../models/Funcionario.js';
import Historico from '../models/Historico.js';

export const cadastrarEPI = async (req, res) => {
  try {
    const novoEPI = await EPI.create(req.body);
    res.status(201).json(novoEPI);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar EPI' });
  }
};

export const listarEPI = async (req, res) => {
  try {
    const epis = await EPI.findAll();
    res.status(200).json(epis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar EPIs' });
  }
};

export const alterarEPI = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do EPI pela URL
    const { descricao } = req.body; // Nova descrição do EPI

    // Atualiza o EPI no banco de dados
    const [linhasAtualizadas] = await EPI.update({ descricao }, { where: { id } });

    if (linhasAtualizadas === 0) {
      return res.status(404).json({ error: 'EPI não encontrado' });
    }

    const epiAtualizado = await EPI.findByPk(id); // Recupera o EPI atualizado
    res.status(200).json(epiAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alterar EPI' });
  }
};


export const removerEPI = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID da URL
    const deletado = await EPI.destroy({ where: { id } });

    if (!deletado) {
      return res.status(404).json({ error: 'EPI não encontrado' });
    }

    res.status(200).json({ message: 'EPI removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover EPI' });
  }
};

export const cadastrarFuncionario = async (req, res) => {
  try {
    const novoFuncionario = await Funcionario.create(req.body);
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
  }
};

export const listarFuncionario = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
};

export const alterarFuncionario = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do funcionário pela URL
    const { nome } = req.body; // Novo nome do funcionário

    // Atualiza o funcionário no banco de dados
    const [linhasAtualizadas] = await Funcionario.update({ nome }, { where: { id } });

    if (linhasAtualizadas === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    const funcionarioAtualizado = await Funcionario.findByPk(id); // Recupera o funcionário atualizado
    res.status(200).json(funcionarioAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alterar funcionário' });
  }
};

export const removerFuncionario = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do funcionário dos parâmetros da URL

    const deletado = await Funcionario.destroy({ where: { id } });

    if (!deletado) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    res.status(200).json({ message: 'Funcionário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover funcionário' });
  }
};

export const registrarRetirada = async (req, res) => {
  try {
    const { funcionarioNome, epiDescricao } = req.body;

    const funcionario = await Funcionario.findOne({ where: { nome: funcionarioNome } });
    const epi = await EPI.findOne({ where: { descricao: epiDescricao } });

    if (!funcionario || !epi) {
      return res.status(400).json({ error: 'Funcionário ou EPI não encontrado' });
    }

    const registro = await Historico.create({ funcionarioId: funcionario.id, epiId: epi.id, tipo: 'Retirada', data: new Date() });
    res.status(201).json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar retirada' });
  }
};

export const registrarDevolucao = async (req, res) => {
  try {
    const { funcionarioNome, epiDescricao } = req.body;

    const funcionario = await Funcionario.findOne({ where: { nome: funcionarioNome } });
    const epi = await EPI.findOne({ where: { descricao: epiDescricao } });

    if (!funcionario || !epi) {
      return res.status(400).json({ error: 'Funcionário ou EPI não encontrado' });
    }

    await Historico.create({ funcionarioId: funcionario.id, epiId: epi.id, tipo: 'Devolução', data: new Date() });
    res.status(201).json({ message: 'Devolução registrada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar devolução' });
  }
};

export const mostrarRetiradas = async (req, res) => {
  try {
    const retiradas = await Historico.findAll({
      where: { tipo: 'Retirada' },
      include: [
        { model: Funcionario, attributes: ['nome'] },
        { model: EPI, attributes: ['descricao'] }
      ]
    });
    res.status(200).json(retiradas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao exibir as retiradas' });
  }
};

export const mostrarDevolucoes = async (req, res) => {
  try {
    const devolucoes = await Historico.findAll({
      where: { tipo: 'Devolução' },
      include: [
        { model: Funcionario, attributes: ['nome'] },
        { model: EPI, attributes: ['descricao'] }
      ]
    });
    res.status(200).json(devolucoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao exibir as devoluções' });
  }
};

export const exibirHistorico = async (req, res) => {
  try {
    const { funcionarioNome, epiDescricao } = req.query;

    const filtros = {};
    if (funcionarioNome) {
      const funcionario = await Funcionario.findOne({ where: { nome: funcionarioNome } });
      if (funcionario) filtros.funcionarioId = funcionario.id;
    }
    if (epiDescricao) {
      const epi = await EPI.findOne({ where: { descricao: epiDescricao } });
      if (epi) filtros.epiId = epi.id;
    }

    const historico = await Historico.findAll({
      where: filtros,
      include: [
        { model: Funcionario, attributes: ['nome'] },
        { model: EPI, attributes: ['descricao'] }
      ]
    });

    res.status(200).json(historico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao exibir o histórico' });
  }
};
