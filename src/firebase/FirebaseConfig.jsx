import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  deleteField,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  } catch (error) {
    console.error(
      "Error signing in: ",
      error.code,
      error.message,
      error.customData.email,
      GoogleAuthProvider.credentialFromError(error)
    );
    throw error;
  }
};

const provider = new GoogleAuthProvider();
auth.languageCode = "en";
const fireDB = getFirestore(app);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Unsubscribe from the listener once we have the user
        resolve(user);
      },
      reject
    );
  });
};

const courseRef = collection(fireDB, "courses");
export const addCourse = async (courses) => {
  try {
    const docRef = await addDoc(courseRef, courses);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// courses.forEach(addCourse);

export const fetchCourses = async () => {
  const coursesCollection = collection(fireDB, "courses");
  const courseSnapshot = await getDocs(coursesCollection);
  const courseList = courseSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return courseList;
};

const courseColl = collection(fireDB, "courses");
const courseSnapshot = await getDocs(courseColl);

// courseSnapshot.forEach((doc) => {
//   // console.log(doc.id); // This logs the document ID for each document in the collection
//   // console.log(doc.data()); // This logs the document data
// });

export const fetchCourseById = async (id) => {
  if (!id) {
    throw new Error("Course ID is required");
  }
  const docRef = doc(fireDB, "courses", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

const userCartsCollection = collection(fireDB, "userCarts");

export const addCourseToCart = async (userId, courseId) => {
  const userCartDoc = doc(fireDB, "userCarts", userId);
  const userCoursesDoc = doc(fireDB, "userCourses", userId);

  try {
    // Check if the course is already in the cart
    const userCartSnap = await getDoc(userCartDoc);
    if (userCartSnap.exists()) {
      const existingCourses = userCartSnap.data().courses || [];
      if (existingCourses.includes(courseId)) {
        alert("Course already in the cart");
        return;
      }
    }

    // Check if the course is already purchased
    const userCoursesSnap = await getDoc(userCoursesDoc);
    if (userCoursesSnap.exists()) {
      const purchasedCourses = userCoursesSnap.data().courses || [];
      if (purchasedCourses.some((course) => course.id === courseId)) {
        alert("Course already purchased");
        return;
      }
    }

    // Add course to the cart
    if (userCartSnap.exists()) {
      await updateDoc(userCartDoc, {
        courses: arrayUnion(courseId),
      });
    } else {
      await setDoc(userCartDoc, {
        courses: [courseId],
      });
    }
    console.log("Course added to cart successfully");
  } catch (error) {
    console.error("Error adding course to cart:", error);
    throw error;
  }
};

export const getUserCart = (userId, callback) => {
  const userCartDoc = doc(fireDB, "userCarts", userId);
  return onSnapshot(userCartDoc, (snapshot) => {
    if (snapshot.exists()) {
      const courseIds = snapshot.data().courses || [];
      callback(courseIds);
    } else {
      callback([]);
    }
  });
};

export const getWishlist = (userId, callback) => {
  const userWishDoc = doc(fireDB, "userWish", userId);
  return onSnapshot(userWishDoc, (snapshot) => {
    if (snapshot.exists()) {
      const courseIds = snapshot.data().courses || [];
      callback(courseIds);
    } else {
      callback([]);
    }
  });
};

export const getCourseDetails1 = async (courseIds) => {
  const coursesPromises = courseIds.map((courseId) =>
    getDoc(doc(fireDB, "courses", courseId))
  );

  try {
    const coursesSnapshots = await Promise.all(coursesPromises);
    const coursesData = coursesSnapshots.map((snapshot) => ({
      id: snapshot.id,
      ...snapshot.data(),
    }));
    return coursesData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseDetails = async (courseIds) => {
  const coursesPromises = courseIds.map((courseObj) =>
    getDoc(doc(fireDB, "courses", courseObj.id))
  );

  try {
    const coursesSnapshots = await Promise.all(coursesPromises);
    const coursesData = coursesSnapshots.map((snapshot) => ({
      id: snapshot.id,
      ...snapshot.data(),
      completed: courseIds.find((courseObj) => courseObj.id === snapshot.id)
        .completed,
    }));
    return coursesData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const removeCourseFromCart = async (userId, courseId) => {
  const userCartDocRef = doc(fireDB, "userCarts", userId);

  try {
    await updateDoc(userCartDocRef, {
      courses: arrayRemove(courseId), // Correctly remove the courseId from the 'courses' array
    });
    console.log("Course removed from cart successfully");
  } catch (error) {
    console.error("Error removing course from cart:", error);
    throw error;
  }
};

export const addPurchasedCourses = async (userId, newCourses) => {
  if (!Array.isArray(newCourses) || newCourses.some((course) => !course.id)) {
    throw new Error("Invalid courses array");
  }

  const userCoursesDocRef = doc(fireDB, "userCourses", userId);

  try {
    // Fetch the existing courses
    const userCoursesDocSnap = await getDoc(userCoursesDocRef);

    let updatedCourses = newCourses.map((course) => ({
      id: course.id,
      completed: false, // Set completed status to false initially
    }));

    const userWishDoc = doc(fireDB, "userWish", userId);

    const userWishSnap = await getDoc(userWishDoc);
    if (userWishSnap.exists()) {
      const existingCourses = userWishSnap.data().courses || [];
      if (existingCourses.includes(existingCourses.id)) {
        await updateDoc(userWishDoc, {
          courses: arrayRemove(existingCourses.id),
        });
        console.log("Course removed from wishlist");
      }
    }

    if (userCoursesDocSnap.exists()) {
      // If document exists, merge with existing courses
      const existingCourses = userCoursesDocSnap.data().courses || [];

      // Ensure no duplicates and maintain completed status
      const existingCoursesMap = new Map(
        existingCourses.map((course) => [course.id, course])
      );
      newCourses.forEach((course) =>
        existingCoursesMap.set(course.id, { ...course, completed: false })
      );

      updatedCourses = Array.from(existingCoursesMap.values());
    }

    // Update or set the user courses document with the combined courses
    await setDoc(userCoursesDocRef, { courses: updatedCourses });
    console.log("Courses added to purchased successfully");
  } catch (error) {
    console.error("Error adding purchased courses:", error);
    throw error;
  }
};

export const clearCart = async (userId) => {
  const userCartDocRef = doc(fireDB, "userCarts", userId);

  try {
    await updateDoc(userCartDocRef, {
      courses: [],
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const getUserCourses = (userId, callback) => {
  const userCoursesDoc = doc(fireDB, "userCourses", userId);
  return onSnapshot(userCoursesDoc, (snapshot) => {
    if (snapshot.exists()) {
      const courseIds = snapshot.data().courses || [];
      callback(courseIds);
    } else {
      callback([]);
    }
  });
};



export const markCourseAsComplete = async (userId, courseId) => {
  const userCoursesDocRef = doc(fireDB, "userCourses", userId);
  try {
    const userCoursesDoc = await getDoc(userCoursesDocRef);
    if (userCoursesDoc.exists()) {
      const courses = userCoursesDoc.data().courses || [];
      const updatedCourses = courses.map((course) =>
        course.id === courseId ? { ...course, completed: true } : course
      );
      await updateDoc(userCoursesDocRef, { courses: updatedCourses });
    }
  } catch (error) {
    console.error("Error marking course as complete:", error);
    throw error;
  }
};

export const addCourseToWishlist = async (userId, courseId) => {
  const userWishDoc = doc(fireDB, "userWish", userId);
  const userCoursesDoc = doc(fireDB, "userCourses", userId);

  try {
    // Check if the course is already in the cart
    const userWishSnap = await getDoc(userWishDoc);
    if (userWishSnap.exists()) {
      const existingCourses = userWishSnap.data().courses || [];
      if (existingCourses.includes(courseId)) {
        alert("Course already in the cart");
        return;
      }
    }

    // Check if the course is already purchased
    const userCoursesSnap = await getDoc(userCoursesDoc);
    if (userCoursesSnap.exists()) {
      const purchasedCourses = userCoursesSnap.data().courses || [];
      if (purchasedCourses.some((course) => course.id === courseId)) {
        alert("Course already purchased");
        return;
      }
    }

    // Add course to the cart
    if (userWishSnap.exists()) {
      await updateDoc(userWishDoc, {
        courses: arrayUnion(courseId),
      });
    } else {
      await setDoc(userWishDoc, {
        courses: [courseId],
      });
    }
    console.log("Course added to wishlist successfully");
  } catch (error) {
    console.error("Error adding course to wishlist:", error);
    throw error;
  }
};

export { auth, fireDB, onAuthStateChanged };
