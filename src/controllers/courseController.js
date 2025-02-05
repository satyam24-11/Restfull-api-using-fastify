const mongoose = require('mongoose')
const Course = require('../models/course')

//get all courses
exports.getCourse = async (req, reply) => {
    try {
        const courses = await Course.find()
        return courses
    }
    catch (err) {
        throw err
    }
}

//get single course
exports.getSingleCourse = async (req, reply) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);
        console.log("Fetched course:", course);

        if (!course) {
            console.log("Course not found for ID:", id);
            return reply.code(404).send({ message: "Course not found" });
        }

        return reply.code(200).send(course);
    } catch (err) {
        throw err
    }
}

//add course
exports.addCourse = async (req, reply) => {
    try {
        const newCourse = new Course(req.body)
        return newCourse.save()

    }
    catch (err) {
        throw err
    }
}
//update an existing course
exports.updateCourse = async (req, reply) => {
    try {
        const id = req.params.id
        const course = req.body
        const { ...updatedCourse } = course
        const update = await Course.findByIdAndUpdate(id, updatedCourse, { new: true })
        return update
    }
    catch (err) {
        throw err
    }
}
//delete an existing course
exports.deleteCourse = async (req, reply) => {
    try {
        const id = req.params.id
        const course = Course.findByIdAndDelete(id)
        return course
    }
    catch (err) {
        throw err
    }
}
