const mongoose = require('mongoose');
const { mongoUri } = require('./config.json');

const conectar = () => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoUri)
    .then(() => console.log("[✅ DATABASE PRONTA] Conectado à database com sucesso!"))
    .catch(err => console.error(err));
  }
};

const userSchema = new mongoose.Schema({
  userId: String,
  diamantes: Number,
  blacklist: String,
  motivoBlacklist: String,
  daily: Number
});

const User = mongoose.model('User', userSchema);

const verificarUsuario = async (idUser) => {
  let usuario = await User.findOne({ userId: idUser });

  if (!usuario) {
    usuario = new User({
      userId: idUser,
      diamantes: 0,
      blacklist: 'não',
      motivoBlacklist: 'Indefinido',
      daily: 0
    });

    await usuario.save();
  }

  return usuario;
};

module.exports = {
  conectar,
  verificarUsuario,
  User
};
