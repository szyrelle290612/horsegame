
import { sendEmail } from '../../../ui/components/extra/EmailSender';
import Utilities from '../../classes/Utilities';

export default {

    createUser: function (users) {
        try {
            const { email, password, firstName, lastName } = users;
            const res = Accounts.createUser({
                email,
                password,
                profile: {
                    name: firstName + " " + lastName,
                    email,
                    roles: ["user"],
                    credit: 0,
                }

            });
            const result = Accounts.sendVerificationEmail(res);

            return { token: result.token }
        } catch (error) {
            Utilities.showError("Unable Create new Account.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);
        }
    },

    resetPassword: function (email) {
        try {
            const user = Accounts.findUserByEmail(email);

            if (!user) {
                throw new Meteor.Error('user-not-found', 'User not found');
            }

            const token = Accounts.generateResetToken(user._id);
            const resetUrl = Meteor.absoluteUrl(`reset-password/${token.token}`);
            sendEmail(email, resetUrl, "reset")
            return true
        } catch (error) {
            Utilities.showError("Unable Reset Password.: ", Utilities.errorMsg(error));
            throw new Meteor.Error(error);

        }
    }
}