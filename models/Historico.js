import { DataTypes } from 'sequelize';
import conexao from '../database.js';
import EPI from './Epi.js';
import Funcionario from './Funcionario.js';

const Historico = conexao.define('Historico', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  funcionarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Funcionario,
      key: 'id'
    }
  },
  epiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EPI,
      key: 'id'
    }
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'historicos',
  timestamps: false
});

Historico.belongsTo(EPI, { foreignKey: 'epiId' });
Historico.belongsTo(Funcionario, { foreignKey: 'funcionarioId' });

EPI.hasMany(Historico, { foreignKey: 'epiId' });
Funcionario.hasMany(Historico, { foreignKey: 'funcionarioId' });

export default Historico;
