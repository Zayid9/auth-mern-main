import bcrypt from 'bcryptjs'; // waxaan import gareynaa bcryptjs si aan u sameyno encryption password-ka user-ka
import jwt from 'jsonwebtoken'; // waxaan import gareynaa jsonwebtoken si aan u sameyno token user-ka
import UserModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';



export const register = async (req, res) => { // waxaan qaadaneynaa parameterska ah req iyo res
    // si aan u sameyno user waxaan u bahanahay somaha name, email iyo password. Dhamaan xogtaasna waxaan ka heleynaa req body
    const { name, email, password } = req.body;

    // Waan hubineynaa in user-ka Data uu galiyay Form-ka iyo Inkale
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please fill all fields, There is Missing Details" });
    }

    // Hadii User-ka uu soo galiyo Data saxan waa in loo xareeyaa data
    try {
        // Ka hor inta aan data loo fasixin in la xareeyo waxaa qasab ah inaan hubino in email-ka uu horay u jiray iyo in kale
        const existingUser = await UserModel.findOne({ email }); // waxaan sameynaa query si aan u sameyno in email-ka uu horay u jiray

        // Hadii User-ka uu horay u jiray email-ka waxaa loo dirayaa error, waxaana loo sheegayaa inuu sameeyo email kale
        if (existingUser) {
            return res.json({ success: false, message: "User Already Exist" });
        }

        // Hadii Email-kiisa uusan horay u jirin, waxaan rabnaa inaan qarino password-ka user-ka si aan loo arag
        const hashedPassword = await bcrypt.hash(password, 10); // waxaan sameynaa encryption password-ka user-ka

        // Hada ayaan u xareynenaa marka data
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        await user.save(); // hada ayuu user-ka ku save gareesan yahay database-ka

        // Waxaan u sameynaa token user-ka si aan u sameyno inuu user-ka login gareeyo, waxaana u direynaa cookie-ka
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Waxaan ugu direynaa token-ka cookie-ka si aan u sameyno inuu user-ka login gareeyo
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // kuwa aan aheyn not sequire sida http waxaa loo sameynaa secure
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
        });

        // Waxaan halkaan kusoo direynaa email-ka qofka Soo dhaweyn
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email, // email obtained from the request body
            subject: "Welcome to Omer's Web App",
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50;">Welcome to Omer's Web App!</h2>
            <p>Dear ${name},</p>
            <p>We are thrilled to have you on board. We hope you enjoy our services.</p>
            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            <p>Best regards,</p>
            <p><strong>Omer's Web App Team</strong></p>
        </div>
    `
        };

        // Waa inaan emialka dirnaa
        await transporter.sendMail(mailOptions);

        // Waa messega soo baxayo marka registeration-ka eey success noqato
        return res.json({ success: true, message: "User Register Success" });

    } catch (error) {
        // console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Please fill all fields, There is Missing Details" });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // kuwa aan aheyn not sequire sida http waxaa loo sameynaa secure
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
        });

        return res.json({ success: true, message: "Login Success" });

    } catch (error) {
        // console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // kuwa aan aheyn not sequire sida http waxaa loo sameynaa secure
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logout Success" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        // Waa inaan soo helna userID-ga si aan u xaqiijino user-ka
        const { userId } = req.body;

        // Markaan user-ka soo helno waxaan rabaa inaan ka raadiyo user-ka database-ka
        const user = await UserModel.findById(userId);

        // Hadii laga soo helo
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account Already Verified" });
        }

        // Hadii uu verified noqan waayana waxaan samyneynaa inaan u generate gareeno OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Otp gaan ku save garee database-ka
        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 Day
        await user.save();

        // Waxaan u direynaa email-ka user-ka otp-ka
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #4CAF50; text-align: center;">Account Verification OTP</h2>
                    <p>Dear User,</p>
                    <p>Your One-Time Password (OTP) for account verification is:</p>
                    <p style="font-size: 24px; font-weight: bold; text-align: center; color: #4CAF50;">${otp}</p>
                    <p>This OTP is valid for 24 hours.</p>
                    <p>Please verify your account by entering this OTP. For your security, do not share this OTP with anyone.</p>
                    <p>Thank you,</p>
                    <p><strong>OneClick.so Team</strong></p>
                </div>
            `
        };

        // Waxaan ugu direynaa email-ka
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Verification OTP Sent Successfully on Your Email" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    // Waa inaan soo helna userID-ga iyo otp-ga si aan u xaqiijino user-ka
    const { userId, otp } = req.body; // userID-gaan saan u helno waxaan dib ka sameenay userAuth oo middleware ahaan ah kasoo aan ka heli doono marka verifications-ka lasoo diro
    // UserID-ga waxaan kusoo dari donaa token-ka

    // Markaan user-ka soo helno waxaan rabaa inaan ka raadiyo user-Idga iyo otp-ga iney ku jiraan db iyo inkale
    if (!userId || !otp) {
        return res.json({ success: false, message: "Please fill all fields, There is Missing Details" });
    }

    // execute the code
    try {
        // Waxaan raadineynaa user-ka leh UserId aan kasoo helnay req body from the database
        const user = await UserModel.findById(userId);

        //  Waxaan xaqiijineynaa User-kan
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist, We Don't Find User" });
        }

        // Hada ayaan xaqiijineynaa iney user-ka uu soo galiyay OTP
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP, Please Enter Correct OTP" });
        }

        // Hada waxaan xaqiijineynaa in uu dhacay otp-ga iyo in kale
        if (user.verifyOtpExpiresAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired, Please Request New OTP" });
        }

        // Hadii uusan otp-ga ka dhicin qofka waxaa loo sameynaa inuu verified noqdo
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpiresAt = 0;

        // Hada ayuu verified noqday
        await user.save();

        return res.json({ success: true, message: "Account Verified Successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Waxaan hubineynaa in user-ka uu yahay authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: "User Authenticated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is Required, Please Fill it" });
    }

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        // Hadii uu verified noqan waayana waxaan samyneynaa inaan u generate gareeno OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Otp gaan ku save garee database-ka
        user.resetOtp = otp;
        user.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000; // 15 Minutes

        await user.save();

        // Waxaan u direynaa email-ka user-ka otp-ka
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset Password OTP",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #4CAF50; text-align: center;">Reset Password OTP</h2>
                    <p>Dear User,</p>
                    <p>Your One-Time Password (OTP) for resetting the password is:</p>
                    <p style="font-size: 24px; font-weight: bold; text-align: center; color: #4CAF50;">${otp}</p>
                    <p>This OTP is valid for 15 minutes.</p>
                    <p>Please reset your password by entering this OTP. For your security, do not share this OTP with anyone.</p>
                    <p>Thank you,</p>
                    <p><strong>OneClick.so Team</strong></p>
                </div>
            `
        };

        // Waxaan ugu direynaa email-ka
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Reset Password OTP Sent Successfully on Your Email" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Please fill all fields, There is Missing Details" });
    }

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP, Please Enter Correct OTP" });
        }

        if (user.resetOtpExpiresAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired, Please Request New OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiresAt = 0;

        await user.save();

        return res.json({ success: true, message: "Password Reset Successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}