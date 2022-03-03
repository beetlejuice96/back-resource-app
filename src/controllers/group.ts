import Group, { IGroup } from "../models/orm/group";
class GroupController {
  async create(req: any, res: any, next: any) {
    const { body: groupReq } = req;
    let newGroup = new Group(groupReq);
    try {
      let groupSaved = await newGroup.save();
      if (groupSaved) {
        return res.json(groupSaved);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        message: error,
      });
    }
  }

  async findById(req: any, res: any, next: any) {
    const { query: idRequest } = req;
    try {
      let group = await Group.findOne({ _id: idRequest.id });
      if (group) {
        return res.json(group);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: error });
    }
  }

  async getAll(req: any, res: any, next: any) {
    try {
      let groups = await Group.find({});
      return res.json(groups);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: error });
    }
  }
}

export default new GroupController();
