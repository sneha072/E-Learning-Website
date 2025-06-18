import React from 'react';
import { Link } from 'react-router-dom';

const Aboutus = () => {
    return (
        <>
            <section className="py-16 bg-gradient-to-l from-white to-green-300 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-gray-800">Why Learn MERN Stack?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-white p-8 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold text-green-400">Full-Stack Mastery</h4>
                            <p className="mt-4 text-gray-600">Learn to build complete web applications from scratch using the MERN stack.</p>
                        </div>
                        <div className="bg-white p-8 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold text-green-400">Job-Ready Skills</h4>
                            <p className="mt-4 text-gray-600">Gain the skills required by the industry, from frontend to backend development.</p>
                        </div>
                        <div className="bg-white p-8 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold text-green-400">Hands-On Projects</h4>
                            <p className="mt-4 text-gray-600">Work on real-world projects that showcase your skills to potential employers.</p>
                        </div>
                    </div>
                    <div className="mt-16">
                        <h3 className="text-2xl font-semibold text-gray-800">Who We Are</h3>
                        <p className="mt-4 text-lg text-gray-600">We are a team of passionate developers and educators dedicated to helping you become a full-stack web developer. We believe in hands-on learning and providing you with the tools and resources needed to succeed in the tech industry.</p>
                    </div>

                    {/* Our Mission */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
                        <p className="mt-4 text-lg text-gray-600">Our mission is to make learning full-stack web development accessible and engaging for everyone. Whether you’re a beginner or an experienced developer looking to expand your skills, we’ve got you covered with the best resources and expert guidance.</p>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-l from-white to-green-300 text-gray-700 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold">Start Learning Today!</h3>
                    <p className="mt-4 text-lg">Sign up now and take your first step towards becoming a MERN stack developer.</p>
                    <Link to="/signup">
                        <button className="mt-6 bg-green-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-500">
                            Join Now
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Aboutus;
