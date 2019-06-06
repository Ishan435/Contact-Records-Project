const express=require('express');
const mongoose=require('mongoose');
const contactlist= mongoose.model('contactList');

var router= express.Router();

router.get('/',(req,res)=>{
  res.render("Contacts/addOrEdit",{
    viewTitle: "Enter Contact"
  });
});

router.post('/',(req,res)=>{
  if(req.body._id==''){
  insertRecord(req,res);}
  else {
    updateRecord(req,res);
  }
});


function insertRecord(req,res){
  var cl=new contactlist();
  cl.fullName=req.body.fullName;
  cl.email=req.body.email;
  cl.mobile=req.body.mobile;
  cl.city=req.body.city;
  cl.save((err,doc)=>{
    if(!err)
    {
    res.redirect('contactlist/record');
    console.log('Working...');
  }
    else {
      if(err.name =='ValidationError'){
        handleValidationError(err,req.body);
        res.render("Contacts/addOrEdit",{
          viewTitle: "Enter Contact",
          cl: req.body
        });
      }
      console.log('Error in inserting into record: '+ err);
    }
  });

}

function handleValidationError(err, body)
{
  for (field in err.errors){
    switch (err.errors[field].path) {
      // path here is fullname.mobile,email,city
      case 'fullName':
         body['fullNameError']=err.errors[field].message;
          break;
        case 'email':
        body['emailError']=err.errors[field].message;

          break;

      default:

    }
  }

}

function updateRecord(req,res){
  contactlist.findOneAndUpdate({_id:req.body._id}, req.body, {new:true},(err,doc)=>{
    if(!err){
      res.redirect('contactlist/record');
    }
    else {
      if(err.name=='ValidationError'){
        handleValidationError(err,req.body);
        res.render("Contacts/addOrEdit",{
          viewTitle: "Update Contact",
          cl: req.body
        });
      }
      else {
        console.log('Error in updating the record instance'+err);
      }
    }
  });
}


router.get('/record',(req,res)=>{
  contactlist.find((err,docs)=>{
    if(!err){
      res.render('Contacts/record',{
        list:docs
      });
    }
    else{
      console.log("Error in retriving contacts:"+err);
    }

  })
});

router.get('/:id',(req,res)=>{
contactlist.findById(req.params.id,(err,doc)=>{
  if(!err){
    res.render("Contacts/addOrEdit",{
      viewTitle: "Update Contact",
      cl: doc
    });

  }
});
});

router.get('/delete/:id',(req,res)=>{
  contactlist.findByIdAndRemove(req.params.id,(err,doc)=>{
    if(!err){res.redirect('/contactlist/record');}
    else {
      console.log("Error in deleting contact:"+err);
    }
  });
});

module.exports=router;
