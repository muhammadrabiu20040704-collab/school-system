import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js"
// REGISTER USER
export const registerUser = async (req, res) => {

    try {

        let {

            name,

            email,

            phone,

            password

        } = req.body;

        // Clean Inputs
        name = name?.trim();
        email = email?.trim().toLowerCase();
        phone = phone?.trim();

        // Validation
        if (!name || !email || !phone || !password) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }

        if (password.length < 6) {

            return res.status(400).json({

                message: "Password must be at least 6 characters"

            });

        }

        // Check Email
        const emailExists = await User.findOne({

            email

        });

        if (emailExists) {

            return res.status(400).json({

                message: "Email already exists"

            });

        }

        // Check Phone
        const phoneExists = await User.findOne({

            phone

        });

        if (phoneExists) {

            return res.status(400).json({

                message: "Phone number already exists"

            });

        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        // Create Student
        const user = await User.create({

            name,

            email,

            phone,

            password: hashedPassword,

            role: "student"

        });

        res.status(201).json({

            message: "Student registered successfully",

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({
  email
}).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {

    const { identifier } = req.body;

    // Check input
    if (!identifier) {
      return res.status(400).json({
        message: "Email or phone number is required"
      });
    }

    // Find user by email OR phone
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token and expiry (15 minutes)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Create Reset URL
const resetUrl =
`${process.env.CLIENT_URL}/reset-password/${resetToken}`;

const message = `
<div style="font-family:Arial,sans-serif;line-height:1.7">

<h2>Password Reset</h2>

<p>Hello <strong>${user.name}</strong>,</p>

<p>You requested to reset your password.</p>

<p>
Click the button below.
</p>

<p>

<a
href="${resetUrl}"
style="
background:#2563eb;
color:#ffffff;
padding:12px 20px;
text-decoration:none;
border-radius:6px;
display:inline-block;
">

Reset Password

</a>

</p>

<p>This link expires in 15 minutes.</p>

<p>If you didn't request this, ignore this email.</p>

</div>
`;

await sendEmail({

    email: user.email,

    subject: "Password Reset",

    message

});

  res.status(200).json({

    message:
    "Password reset link has been sent to your email."

});

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};