import React from "react";
import Navbar from "./Navbar";
import { IoCheckmark } from "react-icons/io5";

const CourseDetails = () => {
  return (
    <>
      <Navbar />
      <div className=" bg-black  h-80">
        <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-white w-[60%]">
            <h1 className="text-xs font-bold">Course Category</h1>
            <p className="text-3xl font-bold pt-3">Course Title</p>
            <p className="text-sm pt-3">
              Course Description one line Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Distinctio autem rerum blanditiis
              voluptates ipsum doloremque eligendi soluta nihil molestias in?
            </p>
            <p className="pt-4">Aman Prajapati</p>
            <div className="flex justify-start pt-4 gap-4">
              <div>Last updated 12/2022</div>
              <div>English</div>
              <div>English [Auto]</div>
            </div>
          </div>

          <div className="w-[25%] fixed right-20 h-[500px] bg-white rounded-2xl border-x-slate-200 shadow-2xl   ">
            <div className="w-full  border">
              <img
                src="https://images.unsplash.com/photo-1718040506078-5a7b90746511?q=80&w=1777&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <button>Enroll Now</button>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" border-2 border-black w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">What Youll learn</p>
          <div className="grid grid-cols-2 px-5 py-4 pb-7">
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">Course Contents</p>
{/* Accordion */}
          <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
              >
                <span>What is Flowbite?</span>
                <svg
                  data-accordion-icon=""
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className="hidden"
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-2">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-2"
              >
                <span>Is there a Figma file available?</span>
                <svg
                  data-accordion-icon=""
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-2"
              className="hidden"
              aria-labelledby="accordion-collapse-heading-2"
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is first conceptualized and designed using the Figma
                  software so everything you see in the library has a design
                  equivalent in our Figma file.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out the{" "}
                  <a
                    href="https://flowbite.com/figma/"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Figma design system
                  </a>{" "}
                  based on the utility classes from Tailwind CSS and components
                  from Flowbite.
                </p>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-3"
              >
                <span>
                  What are the differences between Flowbite and Tailwind UI?
                </span>
                <svg
                  data-accordion-icon=""
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-3"
              className="hidden"
              aria-labelledby="accordion-collapse-heading-3"
            >
              <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  The main difference is that the core components from Flowbite
                  are open source under the MIT license, whereas Tailwind UI is
                  a paid product. Another difference is that Flowbite relies on
                  smaller and standalone components, whereas Tailwind UI offers
                  sections of pages.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  However, we actually recommend using both Flowbite, Flowbite
                  Pro, and even Tailwind UI as there is no technical reason
                  stopping you from using the best of two worlds.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Learn more about these technologies:
                </p>
                <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                  <li>
                    <a
                      href="https://flowbite.com/pro/"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Flowbite Pro
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindui.com/"
                      rel="nofollow"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Tailwind UI
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">Requirements</p>
          </div>
          </div>

          <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">Description</p>
          </div>
          </div>

    </>
  );
};

export default CourseDetails;
