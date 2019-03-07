const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:27018/eats');

const Restaurant = mongoose.model('Restaurant', { name: String });

exports.index = function ( req, res, next ){
  Restaurant.find().exec(function (err, result) {
    res.json(result);
  });
};

exports.store = function ( req, res, next ){
  const restaurant = new Restaurant({ name: req.body.name });
  restaurant.save().then(() => {
    res.json({ status: "created" });
  });
};

exports.search = function ( req, res, next ){
Restaurant.findById(req.params.id)
  .then(restFound => {
    if(!restFound)
    {
    return res.status(404).end();
    }
    return res.status(200).json(restFound);
  })
  .catch(err => next (err));
};

exports.erase = function ( req, res){
  var id=req.params.id;
  Restaurant.findByIdAndDelete({_id:id},function (err){
    if (err)
    {
      console.log(err);
      return res.status(404).end();
    }
      return res.status(200).end();
  })
};


exports.replace = function (req, res){
  var id=req.params.id;
  var name=req.body.name;
  Restaurant.updateOne({_id:id},{name: name},function (err){
    if (err)
    {
      console.log(err);
      return res.status(404).end();
    }
      return res.status(200).end();
  })
};
