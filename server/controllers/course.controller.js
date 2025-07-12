import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia, deleteVideoFromVloudinary } from "../utils/cloudinary.js";
import { generateToken } from "../utils/generateToken.js";

export const createCourse = async (req, res) => {
	try {
		const { courseTitle, category } = req.body;
		if (!courseTitle || !category) {
			return res.status(400).json({
				message: "Course title and category are required."
			})
		}

		const course = await Course.create({
			courseTitle,
			category,
			creator: req.id
		});
		generateToken(res, course, "Course created successfully.");
		// return res.status(201).json({
		// 	course,
		// 	message: "Course created."
		// })
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			message: "Failed to create course"
		})

	}
}

export const searchCourse = async (req, res) => {
	try {
		const { query = "", sortByPrice = "" } = req.query;
		let categories = req.query.categories;

		// Ensure categories is an array
		if (typeof categories === "string") {
			categories = [categories]; // Convert single category string to array
		} else if (!Array.isArray(categories)) {
			categories = []; // Default to empty array if undefined
		}

		console.log("Categories received:", categories);

		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex characters

		const searchCriteria = {
			isPublished: true,
			$or: [
				{ courseTitle: { $regex: escapedQuery, $options: "i" } }, // Case-insensitive exact match
				{ subTitle: { $regex: escapedQuery, $options: "i" } }
			]
		};

		// Apply category filtering correctly
		if (categories.length > 0) {
			searchCriteria.category = { $in: categories.map(cat => new RegExp(cat, "i")) };
		} else {
			searchCriteria.$or.push({ category: { $regex: query, $options: "i" } });
		}

		// Define sorting order
		const sortOptions = {};
		if (sortByPrice === "low") {
			sortOptions.coursePrice = 1; // Sort by price in ascending order
		} else if (sortByPrice === "high") {
			sortOptions.coursePrice = -1; // Sort by price in descending order
		}

		let courses = await Course.find(searchCriteria)
			.populate({ path: "creator", select: "name photoUrl" })
			.sort(sortOptions);
		generateToken(res, courses, "Courses fetched successfully.");
		return res.status(200).json({
			success: true,
			courses: courses || []
		});

	} catch (error) {
		console.error("Error in searchCourse:", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};

export const getPublishedCourse = async (_, res) => {
	try {
		const courses = await Course.find({ isPublished: true }).populate({ path: "creator", select: "name photoUrl" });
		if (!courses) {
			return res.status(404).json({
				message: "Course not found"
			})
		}
		generateToken(res, courses, "Published courses fetched successfully.");
		return res.status(200).json({
			courses,
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to get published courses"
		})
	}
}


export const getCreatorCourses = async (req, res) => {
	try {
		const userId = req.id;
		const courses = await Course.find({ creator: userId });
		if (!courses) {
			return res.status(404).json({
				courses: [],
				message: "Course not found"
			})
		};
		generateToken(res, courses, "Creator courses fetched successfully.");
		return res.status(200).json({
			courses,
		})
		
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to create course"
		})
	}
}

export const editCourse = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
		const thumbnail = req.file;

		let course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				message: "Course not found!"
			})
		}
		let courseThumbnail;
		if (thumbnail) {
			if (course.courseThumbnail) {
				const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
				await deleteMediaFromCloudinary(publicId); // delete old image
			}
			// upload a thumbnail on clourdinary
			courseThumbnail = await uploadMedia(thumbnail.path);
		}


		const updateData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url };

		course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
		generateToken(res, course, "Course updated successfully.");
		return res.status(200).json({
			course,
			message: "Course updated successfully."
		})

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to create course"
		})
	}
}


export const getCourseById = async (req, res) => {
	try {
		const { courseId } = req.params;

		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				message: "Course not found!"
			})
		}
		generateToken(res, course, "Course fetched successfully.");
		return res.status(200).json({
			course
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to get Course by id"
		})
	}
}

export const removeCourse = async (req, res) => {
	try {
		const { courseId } = req.params;

		const course = await Course.findByIdAndDelete(courseId);
		if (!course) {
			return res.status(404).json({
				message: "Course not found"
			})
		}
		//delete course thumbnail from cloudinary
		if (course.courseThumbnail) {
			const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
			await deleteMediaFromCloudinary(publicId);
		}
		if (course.lectures.length > 0) {
			//delete all lectures associated with the course.
			try {
				await Lecture.deleteMany({ _id: { $in: course.lectures } });
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					message: "Failed to remove course"
				})
			}
		}
		generateToken(res, null, "Course removed successfully.");
		return res.status(200).json({
			message: "Course removed successfully"
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to remove course"
		})
	}
}
export const createLecture = async (req, res) => {
	try {
		const { lectureTitle } = req.body;
		const { courseId } = req.params;

		if (!lectureTitle || !courseId) {
			return res.status(400).json({
				message: "Lecture title is required"
			})
		}

		//create lecture
		const lecture = await Lecture.create({
			lectureTitle, courseId
		})

		const course = await Course.findById(courseId);
		if (course) {
			course.lectures.push(lecture._id);
			await course.save();
		}
		generateToken(res, lecture, "Lecture created successfully.");
		return res.status(201).json({
			lecture,
			message: "Lecture created successfully."
		});

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to create lecture"
		})
	}
}

export const getCourseLecture = async (req, res) => {
	try {
		const { courseId } = req.params;
		const course = await Course.findById(courseId).populate("lectures");
		if (!course) {
			return res.status(404).json({
				message: "Course not found"
			})
		}
		generateToken(res, course.lectures, "Lectures fetched successfully.");
		return res.status(200).json({
			lectures: course.lectures
		});

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to get lecture"
		})
	}
}

export const editLecture = async (req, res) => {
	try {
		const { lectureTitle, videoInfo, isPreviewFree } = req.body;
		const { courseId, lectureId } = req.params;
		const lecture = await Lecture.findById(lectureId);
		if (!lecture) {
			console.log("Lecture not found");
			return res.status(400).json({
				message: "Lecture not found."
			})
		}

		//update lecture
		if (lectureTitle) lecture.lectureTitle = lectureTitle;
		if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
		if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
		lecture.isPreviewFree = isPreviewFree;

		await lecture.save();

		//Ensure the course still has the lecture id if it  was not already added
		const course = await Course.findById(courseId);
		if (course && !course.lectures.includes(lecture._id)) {
			course.lectures.push(lecture._id);
			console.log("lecture added to course");
			await course.save();
		}
		generateToken(res, lecture, "Lecture updated successfully.");
		return res.status(200).json({
			lecture,
			message: "Lecture updated successfully."
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to get lecture"
		})
	}
}

export const removeLecture = async (req, res) => {
	try {
		const { lectureId } = req.params;
		const lecture = await Lecture.findByIdAndDelete(lectureId);
		if (!lecture) {
			return res.status(404).json({
				message: "Lecture not found"
			});
		}
		//delete lecture form cloudinary
		if (lecture.publicId) {
			await deleteMediaFromCloudinary(lecture.publicId);
		}

		//remove lecture reference from associated course
		await Course.updateOne(
			{ lectures: lectureId },
			{ $pull: { lectures: lectureId } } // remove lecture
		);
		generateToken(res, null, "Lecture removed successfully.");
		return res.status(200).json({
			message: "Lecture removed successfully"
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to remove lecture"
		})
	}
}

export const getLectureById = async (req, res) => {
	try {
		const { lectureId } = req.params;
		const lecture = await Lecture.findById(lectureId);
		if (!lecture) {
			return res.status(404).json({
				message: "Lecture not found"
			});
		}
		generateToken(res, lecture, "Lecture fetched successfully.");
		return res.status(200).json({
			lecture
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to get lecture by id"
		})
	}
}




export const togglePublishCourse = async (req, res) => {
	try {
		const { courseId } = req.params;
		const { publish } = req.query; // false,true
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				message: "Course not found!"
			});
		}
		//publish status based on the query parameter.

		course.isPublished = publish === "true";
		await course.save();

		const statusMessage = course.isPublished ? "Published" : "Unpublished";
		generateToken(res, course, `Course is ${statusMessage}`);
		return res.status(200).json({
			message: `Course is ${statusMessage}`
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Failed to update status"
		})
	}
}
