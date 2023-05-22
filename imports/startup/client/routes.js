import * as React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Signup from "../../ui/components/Signup";
import Login from "../../ui/components/Login";
import HomeScreen from "../../ui/components/HomeScreen";
import GameScreen from "../../ui/components/GameScreen";
import Mybet from "../../ui/components/Mybet";
import PlaceBet from "../../ui/components/PlaceBet";
import HorseStats from "../../ui/components/HorseStats";
import MatchHistory from "../../ui/components/MatchHistory";
import MatchHistoryResult from "../../ui/components/MatchHistoryResult";
import QrScan from "../../ui/components/QrScan";
import RewardBarcode from "../../ui/components/RewardBarcode";
import UpcomingRaces from "../../ui/components/UpcomingRaces";
import UpcomingRacesDetails from "../../ui/components/UpcomingRacesDetails";
import SubTopNav from "../../ui/components/SubTopNav";
import Live from "../../ui/components/subparentComponent/Live";
import EmailVerification from "../../ui/components/EmailVerification";
import ForgotPassword from "../../ui/components/account/ForgotPassword";
import ResetPassword from "../../ui/components/account/ResetPassword";
import UserMainComponent from "../../ui/components/subparentComponent/UserMainComponent";
import AdminMainComponent from "../../ui/components/subparentComponent/AdminMainComponent";
import NotFound from "../../ui/Notfound";
import Main from "../../ui/components/admin/Main";
import Broadcast from "../../ui/components/admin/Broadcast";
import CreateNew from "../../ui/components/admin/CreateNew";
import Settings from "../../ui/components/admin/Settings";
import NotificationMain from "../../ui/components/notification/NotificationMain";
import Reward from "../../ui/components/reward/Reward";
import GenerateQrcode from "../../ui/components/admin/GenerateQrcode";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RewardDetails from "../../ui/components/admin/RewardDetails";
import BetDetails from "../../ui/components/admin/BetDetails";
import RouletteMain from "../../ui/components/roulette/RouletteMain";
import RouletteUserParent from "../../ui/components/roulette/RouletteUserParent";
import AdminQrScan from "../../ui/components/admin/AdminQrScan";



const SubTopNavigation = () => (
    <SubTopNav Component={<Outlet />} />
);

const ParentVideos = () => (
    <Live Component={<Outlet />} />
);


const Home = () => {
    return (
        <div className="routes">
            <ToastContainer />
            <Routes>
                <Route path="/email-verification/:token" element={<EmailVerification />} />
                <Route path="/*" element={<NotFound />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />


                <Route element={<UserMainComponent allow={"user"} />}>
                    <Route element={<SubTopNavigation />}>
                        <Route path="/home" element={<HomeScreen />} />
                        <Route path="/horse-stats" element={<HorseStats />} />
                        <Route path="/reward" element={< Reward />} />
                        <Route path="/reward-barcode" element={< RewardBarcode />} />
                        <Route element={<ParentVideos />}>
                            <Route path="/game" element={<GameScreen />} />
                            <Route path="/mybet" element={<Mybet />} />
                            <Route path="/placebet" element={<PlaceBet />} />
                        </Route>
                        <Route path="/roulette" element={<RouletteUserParent />} />
                    </Route>
                    <Route path="/match-history" element={<MatchHistory />} />
                    <Route path="/match-result" element={<MatchHistoryResult />} />
                    <Route path="/upcoming-race" element={<UpcomingRaces />} />
                    <Route path="/upcoming-race-detials" element={<UpcomingRacesDetails />} />
                    <Route path="/notification" element={<NotificationMain />} />
                    <Route path="/qrscan" element={<QrScan />} />
                </Route>
                <Route element={<AdminMainComponent allow={"admin"} />}>
                    <Route element={<Main />} >
                        <Route path="/admin-add" element={<CreateNew />} />
                        <Route path="/admin-live" element={<Broadcast />} />
                        <Route path="/admin-settings" element={<Settings />} />
                        <Route path="/admin-qr" element={<GenerateQrcode />} />
                        <Route path="/admin-qrscan" element={<AdminQrScan />} />
                        <Route path="/admin-reward" element={<RewardDetails />} />
                        <Route path="/admin-roulette" element={<RouletteMain />} />
                        <Route path="/admin-bet-details" element={<BetDetails />} />
                    </Route>
                </Route>
            </Routes>
        </div>

    );
};

export default Home;
