import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOtp: {type: String, default: ''},
    verifyOtpExpiresAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpiresAt: {type: Number, default: 0},
});


// Qaabkaan waxey soo celinaa mantoo dhan modelka User mar waliba oo la run gareeyaba waxee sameynesaa iney modelka User cusbooneysiiso
// const UserModel = mongoose.model('User', userSchema);

// Qaabkan ayaa ah qaab ugu fiican, waayo haduu horey usameysnaa model ah user masoo celcelineyso oo or operator ayaan raacinay
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;