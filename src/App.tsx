import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, Notice, OfflinePage, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div>
            <main className='flex h-screen'>
                {!isOnline ? (
                    // Display the offline page
                    <OfflinePage />
                ) : (
                    // Render the app content based on routes
                    
                    <Routes>

                        {/* Public Routes */}

                        <Route element={<AuthLayout />}>
                            <Route path="/sign-in" element={<SigninForm />} />
                            <Route path="/sign-up" element={<SignupForm />} />
                        </Route>

                        {/* Private Routes */}
                        <Route element={<RootLayout />}>
                            <Route index element={<Home />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/saved" element={<Saved />} />
                            <Route path="/all-users" element={<AllUsers />} />
                            <Route path="/create-post" element={<CreatePost />} />
                            <Route path="/update-post/:id" element={<EditPost />} />
                            <Route path="/posts/:id" element={<PostDetails />} />
                            <Route path="/profile/:id/*" element={<Profile />} />
                            <Route path="/update-profile/:id" element={<UpdateProfile />} />
                            <Route path="/notice" element={<Notice />} />

                        </Route>
                    </Routes>
                )}
                <Toaster />
            </main>
        </div>
    );
};

export default App;
