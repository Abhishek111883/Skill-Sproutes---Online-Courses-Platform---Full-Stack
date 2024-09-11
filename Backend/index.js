const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Online Course Platform");
});

const verifyjwt = (req, res, next) => {
  const authorization = req.headers.authorization;

  // Debugging log to check authorization header
  console.log("Authorization Header:", authorization);

  if (!authorization) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  // Extract the token from the authorization header
  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      // Log the error for debugging purposes
      console.error("JWT Verification Error:", err);
      res.status(401).json({ error: "Forbidden access" });
      return;
    }

    // Attach the decoded user info to the request object
    req.decoded = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
};

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Connect to database collections
    const database = client.db("Cluster0");
    const UserCollection = database.collection("UserDB");
    const ClassesCollection = database.collection("ClassesDB");
    const CartCollection = database.collection("CartDB");
    const PaymentCollection = database.collection("PaymentDB");
    const OrderCollection = database.collection("OrderDB");
    const EnrollmentCollection = database.collection("EnrollmentDB");
    const AppliedCollection = database.collection("AppliedDB");

    // token
    app.post("/api/set-token", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.json(token);
    });

    //middleware for admin and instructor
    const verifyadmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await UserCollection.findOne(query);
      if (user.role === "admin") {
        next();
      } else {
        res.status(401).json({ error: "Unauthorized access" });
      }
    };

    const verifyinstructor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await UserCollection.findOne(query);
      if (user.role === "instructor") {
        next();
      } else {
        res.status(401).json({ error: "Unauthorized access" });
      }
    };

    //routes for Users
    app.post("/new-user", async (req, res) => {
      try {
        const query = { email: req.body.email };

        // Correct the query usage here
        const existingUser = await UserCollection.findOne(query);

        if (existingUser) {
          // If the user exists, return the user data
          return res.status(200).json({ message: "User already exists" });
        }

        // If the user does not exist, insert a new record
        const newUser = req.body;
        const result = await UserCollection.insertOne(newUser);
        res.status(201).send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while adding the user" });
      }
    });

    // get all users
    app.get("/users", async (req, res) => {
      try {
        const result = await UserCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the users" });
      }
    });

    // get user by id
    app.get("/user/:id", verifyjwt, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await UserCollection.find(query).toArray();
        console.log(result);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the user" });
      }
    });

    // get user by email
    app.get("/users/:email", verifyjwt, async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email: email };
        const result = await UserCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the user" });
      }
    });

    // delete user by id
    app.delete("/delete-user/:id", verifyjwt, verifyadmin, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await UserCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while deleting the user" });
      }
    });

    // update user by id
    app.put("/update-user/:id", verifyadmin, verifyjwt, async (req, res) => {
      try {
        const id = req.params.id;
        const updateuser = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedoc = {
          $set: {
            name: updateuser.name,
            email: updateuser.email,
            role: updateuser.role,
            address: updateuser.address,
            about: updateuser.about,
            photoUrl: updateuser.photoUrl,
            skills: updateuser.skills ? updateuser.skills : null,
          },
        };
        const result = await UserCollection.updateOne(
          filter,
          updatedoc,
          options
        );
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while updating the user" });
      }
    });

    // Classes routes here
    app.post("/newclass", verifyjwt, verifyinstructor, async (req, res) => {
      try {
        const newClass = req.body;
        const result = await ClassesCollection.insertOne(newClass);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while adding the class" });
      }
    });

    // get all classes
    app.get("/classes", async (req, res) => {
      try {
        const result = await ClassesCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the classes" });
      }
    });

    // get class by email
    app.get(
      "/classes/:email",
      verifyjwt,
      verifyinstructor,
      async (req, res) => {
        try {
          const email = req.params.email;
          const query = { instructorEmail: email };
          const result = await ClassesCollection.find(query).toArray();
          res.send(result);
        } catch (error) {
          console.error("Error in /classes/:email route:", error);
          res
            .status(500)
            .json({ error: "An error occurred while getting the classes" });
        }
      }
    );

    //get only approved classes
    app.get("/approved-classes", async (req, res) => {
      try {
        const query = { status: "approved" };
        const result = await ClassesCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the classes" });
      }
    });
    //get only pending classes
    app.get("/pending-classes", async (req, res) => {
      try {
        const query = { status: "pending" };
        const result = await ClassesCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the classes" });
      }
    });

    //get only one class details by id

    app.get("/class/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await ClassesCollection.findOne(query);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the class" });
      }
    });

    // modify classes change status and reason
    app.patch(
      "/change-status/:id",
      verifyjwt,
      verifyadmin,
      async (req, res) => {
        try {
          const id = req.params.id;
          const { status } = req.body;
          const query = { _id: new ObjectId(id) };
          const updatedoc = { $set: { status: status } };
          const options = { upsert: true };
          const result = await ClassesCollection.updateOne(
            query,
            updatedoc,
            options
          );
          res.send(result);
        } catch (error) {
          res
            .status(500)
            .json({ error: "An error occurred while updating the class" });
        }
      }
    );

    // update class details(all data) by id
    app.patch(
      "/update-class/:id",
      verifyinstructor,
      verifyjwt,
      async (req, res) => {
        try {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const updatedoc = { $set: req.body };
          const options = { upsert: true };
          const result = await ClassesCollection.updateOne(
            query,
            updatedoc,
            options
          );
          res.send(result);
        } catch (error) {
          res
            .status(500)
            .json({ error: "An error occurred while updating the class" });
        }
      }
    );

    // add cart-item
    app.post("/add-to-cart", verifyjwt, async (req, res) => {
      try {
        const newCartItem = req.body;
        const result = await CartCollection.insertOne(newCartItem);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while adding the item to cart" });
      }
    });

    //get cart item by class id
    app.get("/cart-item/:id", verifyjwt, async (req, res) => {
      try {
        const id = req.params.id;
        const email = req.query.email;
        const query = { classId: id, email: email };

        const projection = { classId: 1 };
        const result = await CartCollection.findOne(query, {
          projection: projection,
        });

        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the cart items" });
      }
    });

    // get all cart item
    app.get("/all-cart-items", verifyjwt, async (req, res) => {
      try {
        const result = await CartCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the cart items" });
      }
    });

    // get cart items by email
    app.get("/cart/:email", verifyjwt, async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email: email };
        const projection = { classId: 1 };
        const carts = await CartCollection.find(query, {
          projection: projection,
        }).toArray();
        const classIds = carts.map((cart) => new ObjectId(cart.classId));
        const query2 = { _id: { $in: classIds } };
        const result = await ClassesCollection.find(query2).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the cart items" });
      }
    });

    // delete cart item by id
    app.delete("/delete-cart-item/:id", verifyjwt, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { classId: id };
        const result = await CartCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while deleting the cart item" });
      }
    });

    //payment routes

    //[ayment intent
    app.post("/create-payment-intent", verifyjwt, async (req, res) => {
      try {
        const { price } = req.body;
        amount = parseInt(price) * 100;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while creating payment intent" });
      }
    });

    // post payment info to db
    // post payment info to db
    app.post("/payment-info", verifyjwt, async (req, res) => {
      try {
        const paymentInfo = req.body;
        const classesId = paymentInfo.classesId;
        const email = paymentInfo.email;
        const singleClassId = req.query.classId;

        let query;
        if (singleClassId) {
          query = { classId: singleClassId, email: email };
        } else {
          query = { classId: { $in: classesId } };
        }

        const classesQuery = {
          _id: { $in: classesId.map((id) => new ObjectId(id)) },
        };

        const classes = await ClassesCollection.find(classesQuery).toArray();

        const newEnrolledData = {
          email: email,
          classId: singleClassId
            ? new ObjectId(singleClassId)
            : classesId.map((id) => new ObjectId(id)),
          transactionId: paymentInfo.transactionId,
        };

        const updatedDoc = {
          $inc: {
            totalEnrolled: 1,
            availableSeats: -1,
          },
        };

        const updatedResult = await ClassesCollection.updateMany(
          classesQuery,
          updatedDoc
        );
        const enrolledResult = await EnrollmentCollection.insertOne(
          newEnrolledData
        );
        const deletedResult = await CartCollection.deleteMany(query);
        const paymentResult = await PaymentCollection.insertOne(paymentInfo);

        res.send({
          paymentResult,
          deletedResult,
          enrolledResult,
          updatedResult,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    //get payment history by email
    app.get("/payment-history/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email: email };
        const result = await PaymentCollection.find(query)
          .sort({ data: -1 })
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(500).json({
          error: "An error occurred while getting the payment history",
        });
      }
    });

    //payment history length
    app.get("/payment-history-length/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email: email };
        const result = await PaymentCollection.countDocuments(query);
        res.send({ result });
      } catch (error) {
        res.status(500).json({
          error: "An error occurred while getting the payment history",
        });
      }
    });

    // enrollment routes
    app.get("/popular-classes", async (req, res) => {
      try {
        const result = await ClassesCollection.find()
          .sort({ totalEnrolled: -1 })
          .limit(6)
          .toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the classes" });
      }
    });
    //admin status
    app.get("/admin-status", verifyjwt, verifyadmin, async (req, res) => {
      try {
        const approvedclasses = (
          await ClassesCollection.find({
            status: "approved",
          }).toArray()
        ).length;
        const pendingClasses = (
          await ClassesCollection.find({
            status: "pending",
          }).toArray()
        ).length;
        const instructor = (
          await UserCollection.find({ role: "instructor" }).toArray()
        ).length;
        const totalclasses = (await ClassesCollection.find().toArray()).length;
        const totalenrolled = (await EnrollmentCollection.find().toArray())
          .length;

        const result = {
          approvedclasses,
          pendingClasses,
          instructor,
          totalclasses,
          totalenrolled,
        };
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the classes" });
      }
    });
    //get all instruuctor
    app.get("/instructors", async (req, res) => {
      try {
        const result = await UserCollection.find({
          role: "instructor",
        }).toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while getting the instructors" });
      }
    });

    //get enrolled classes by email
    app.get("/enrolled-classes/:email", verifyjwt, async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email: email };
        const pipeline = [
          {
            $match: query,
          },
          {
            $lookup: {
              from: "ClassesDB",
              localField: "classId",
              foreignField: "_id",
              as: "classes",
            },
          },
          {
            $unwind: "$classes",
          },
          {
            $lookup: {
              from: "UserDB",
              localField: "ClassesDB.instructorEmail",
              foreignField: "email",
              as: "instructor",
            },
          },
          {
            $project: {
              _id: 0,
              classes: 1,
              instructor: {
                $arrayElemAt: ["$instructor", 0],
              },
            },
          },
        ];
        const result = await EnrollmentCollection.aggregate(pipeline).toArray();
        // const result = await enrolledCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).json({
          error: "An error occurred while getting the enrolled class",
        });
      }
    });

    // Applied route
    app.post("/as-instructor", async (req, res) => {
      try {
        const data = req.body;
        const result = await AppliedCollection.insertOne(data);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while applying as instructor" });
      }
    });
    app.get("/applied-instructors/:email", async (req, res) => {
      const email = req.params.email;
      const result = await AppliedCollection.findOne({ email });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
