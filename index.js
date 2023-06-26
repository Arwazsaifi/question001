const {MongoClient}=require('mongodb');
const url="mongodb://127.0.0.1:27017";
const dbName='mydb';
const express=require('express');
const app=express();
const client=new MongoClient(url);
const md5=require('md5');
async function connectData()
{
  const result=await client.connect();
  console.log("database connected");
  const db=result.db(dbName);
  db.createCollection("user",function(err,db)
  {
    if(err) throw err;
  });
  db.createCollection("userProfile",function(err,db)
  {
    if(err) throw err;
  });
  const userKeys=[
    {firstname:'Arwaz',lastname:'saifi',email:'arwaz@gmail.com',age:20,password:md5('arwaz')},
    {firstname:'Mohan',lastname:'sharma',email:'Mohan98879@gmail.com',age:23,password:md5('mohan')},
    {firstname:'Rohit',lastname:'verma',email:'rohit68@gmail.com',age:43,password:md5('Rohit')},
    {firstname:'Karan',lastname:'saxena',email:'karan08@gmail.com',age:34,password:md5('karan')},
    {firstname:'Arman',lastname:'khan',email:'arman67@gmail.com',age:18,password:md5('arman')},
  ];
  const userProfileKeys=[
    {user_id:'101',dob:'28-06-2001',mobile_no:'7832732822',},
    {user_id:'102',dob:'11-02-2002',mobile_no:'1122334455'},
    {user_id:'103',dob:'20-05-2003',mobile_no:'6677889900'},
    {user_id:'104',dob:'1-06-1999',mobile_no:'6683289763'},
    {user_id:'105',dob:'28-06-1998',mobile_no:'7832732822'},
];
  await db.collection('user').insertMany(userKeys);
  await db.collection('userProfile').insertMany(userProfileKeys);
     
  console.log("data added successfully");

}
connectData();

//get api to fetch data from the database
app.get('/users', async (req, res) => {
    try {
        const result=await client.connect();
        console.log("users route called");
        const db=result.db(dbName);
  
      const users = await db.collection('user').find().toArray();
      res.send(users);
    } catch (err) {
      console.error('Failed to get users:', err);
    }
  });
// get api for getting average age of all users.
  app.get('/average-age', async (req, res) => {
        try {
            const result=await client.connect();
            console.log("average route called");
            const db=result.db(dbName);
            const users = await db.collection('user').find().toArray();

            let totalAge = 0;
            for (const user of users) {
              totalAge += user.age;
            }
          const averageAge = totalAge/users.length;


          res.send({averageAge});
        } catch (err) {
          console.error('failed to get avg age of users', err);
        }
      });


   app.listen(4000) 
   
   console.log('Server is runnning on port 4000');

  