const mongoose = require("mongoose");

const conservationSchema = new mongoose.Schema(
  {

    groupTittle:{
        type:String
    },
    members: {
      type: Array,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Conservation", conservationSchema);
