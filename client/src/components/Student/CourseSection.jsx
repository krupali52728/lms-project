import React from "react";
import CourseCard from "./CourseCard";

const CoursesSection = () => {

  // in this section i will call you the api 


  const courses = [
    {
      title: "AWS Cloud Essentials",
      description: "Learn the basics of AWS Cloud services and architecture.",
      image: "https://source.unsplash.com/400x300/?cloud,technology",
      duration: "4 Weeks",
      level: "Beginner",
    },
    {
      title: "React Frontend Development",
      description: "Build responsive, interactive UIs with React and Tailwind.",
      image: "https://source.unsplash.com/400x300/?reactjs,code",
      duration: "6 Weeks",
      level: "Intermediate",
    },
    {
      title: "DevOps with Docker & Kubernetes",
      description:
        "Master containerization, CI/CD pipelines, and orchestration tools.",
      image: "https://source.unsplash.com/400x300/?devops,kubernetes",
      duration: "8 Weeks",
      level: "Advanced",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-[#0a1128]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our Popular <span className="text-blue-400">Courses</span>
          </h2>
        </div>
    <div className="h-9"></div>
        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
