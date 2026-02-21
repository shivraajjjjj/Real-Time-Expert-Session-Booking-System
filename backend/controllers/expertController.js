const Expert = require('../models/expert');
// Get all experts
const allexperts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const sort = req.query.sort || 'createdAt';

    let query = {};

    if (category) {
        query.category = category;
    }

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const total = await Expert.countDocuments(query);

    try{
        let sortOption = sort;
        if (sort === 'rating' || sort === 'experience') {
            sortOption = { [sort]: -1 };
        } else if (sort === 'createdAt') {
            sortOption = { createdAt: -1 };
        }

        const experts = await Expert.find(query).sort(sortOption).skip(skip).limit(limit);
        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            experts
        });
    }catch(error){
        res.status(500).json({ message: 'An error occurred while fetching experts.', error: error.message });
    }
};

// Get expert by ID
const getExpertById = async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);
        if(!expert){
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.status(200).json(expert);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the expert.', error: error.message });
    }
};

module.exports = {
    allexperts,
    getExpertById
}