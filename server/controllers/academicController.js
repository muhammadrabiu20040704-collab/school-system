import AcademicSession from "../models/AcademicSession.js";

export const createAcademicSession = async (req, res) => {

    try {
        const { session } = req.body;
        
            if (!session?.trim()) {
                 return res.status(400).json({
                message: "Session is required"
             });
           }

              //dublicate check
        const existingSession = await AcademicSession.findOne({
            session
        });


         //validation
        if(existingSession) {
            return res.status(400).json({
             message: "Academic Session already exists"
            });
        }
             //create
        const academicSession = await AcademicSession.create({
            session
        });
            //response
        res.status(201).json({
            message: "Academic Session created successfully",
            academicSession
        })

    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

//get all session
export const getAcademicSessions = async (req, res) => {

    try {

          const academicSessions = await AcademicSession.find()
           .sort({ createdAt: -1 });

            res.status(200).json(academicSessions)

    } catch (error) {
        res.status(500).json({
      message: error.message
        });
    }

};

//active session
export const activateAcademicSession = async (req, res) => {

    try {
       
        const academicSession = await AcademicSession.findById(req.params.id);

        if(!academicSession) {
            return res.status(404).json({
                message: "Academic Session not found"
            });
        }
        
        await AcademicSession.updateMany(
            {},
            {
                isActive: false
            }
        );

        academicSession.isActive = true;

        await academicSession.save();

         res.status(200).json({
            message: "Academic Session activated successfully",
            academicSession
        })


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const updateAcademicSession = async (req, res) => {
  try {
    const { session } = req.body;

    const academicSession = await AcademicSession.findById(req.params.id);

    if (!academicSession) {
      return res.status(404).json({
        message: "Academic Session not found"
      });
    }

    const existingSession = await AcademicSession.findOne({
      session,
      _id: { $ne: req.params.id }
    });

    if (existingSession) {
      return res.status(400).json({
        message: "Academic Session already exists"
      });
    }

    academicSession.session = session;

    await academicSession.save();

    res.status(200).json({
      message: "Academic Session updated successfully",
      academicSession
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
//archive session
export const archiveAcademicSession = async (req, res) => {

    try {

        const academicSession = await AcademicSession.findById(req.params.id);

        if (!academicSession) {
            return res.status(404).json({
                message: "Academic Session not found"
            });
        }
//archive
        academicSession.isArchived = true;

       academicSession.isActive = false;

       await academicSession.save();

        res.status(200).json({
            message: "Academic Session archived successfully",
            academicSession
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};