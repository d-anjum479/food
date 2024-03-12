import { Category } from "../models/categoryModel.js";

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title",
      });
    }
    // checking duplicate category
    const isExists = await Category.findOne({ title });
    if (isExists) {
      return res.status(500).send({
        success: false,
        message: "Category already exists",
      });
    }

    // creating category
    const newCategory = new Category({ title, imageUrl });
    const category = await newCategory.save();
    if (category) {
      return res
        .status(201)
        .send({ success: true, message: "New category added", category });
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in createCategoryController API",
        error,
      });
  }
};
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.status(500).send({
        success: false,
        message: "No Category found",
      });
    }

    return res.status(200).send({
      success: true,
      totalCount: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in getAllCategoriesController api",
      });
  }
};
const getCategoryByIdController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(500).send({
        success: false,
        message: "Please provide category id",
      });
    }
    const category = await Category.findById({ _id: categoryId });
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category found",
      });
    }

    return res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in getCategoryByIdController api",
        error,
      });
  }
};

const getCategoryByTitleController = async (req, res) => {
  try {
    const categoryTitle = req.body.title;
    if (!categoryTitle) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title",
      });
    }
    const category = await Category.findOne({ title: categoryTitle });
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category found",
      });
    }

    return res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in getCategoryByTitleController api",
        error,
      });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { title, imageUrl } = req.body;
    if (!categoryId || !title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category id and Title",
      });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    return res
      .status(200)
      .send({ success: false, message: "Category updated successfully" });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in updateCategoryController api",
        error,
      });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    // const { id } = req.params;
    if (!categoryId) {
      return res.status(500).send({
        success: false,
        message: "Please provide category id",
      });
    }
    const delCategory = await Category.findByIdAndDelete(categoryId);
    if (!delCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    return res
      .status(200)
      .send({ success: false, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in deleteCategoryController api",
        error,
      });
  }
};

export {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryByTitleController,
  updateCategoryController,
  deleteCategoryController,
};
