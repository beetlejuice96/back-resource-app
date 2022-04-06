import Resource, { IResource } from "../models/orm/resource";
import Group, { IGroup } from "../models/orm/group";

interface IRequestFind {
  id: string;
}

class ResourceController {
  async create(req: any, res: any, next: any) {
    const { body: resuorceReq } = req;
    let newResource = new Resource(resuorceReq);

    try {
      let findGroup = await Group.findOne({ _id: resuorceReq.group });
      console.log(findGroup);
      if (!findGroup) {
        return res.status(404).send({ message: "group no encontrado!" });
      }
      let resourceSaved = await newResource.save();
      let groupUpdated = await Group.updateOne(
        { _id: findGroup._id },
        { $set: { resources: [...findGroup.resources, resourceSaved._id] } }
      );

      if (resourceSaved) {
        return res.json(resourceSaved);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        message: error,
      });
    }
  }

  async findResourceById(req: any, res: any, next: any) {
    const { id } = req.query;
    try {
      let resource = await Resource.findOne({ _id: id });
      if (resource) {
        return res.json(resource);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: error });
    }
  }

  async getAll(req: any, res: any, next: any) {
    const { idGroup } = req.params;
    try {
      let resources = await Resource.find({ group: idGroup });
      return res.json(resources);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: error });
    }
  }

  async delete(req: any, res: any, next: any) {
    const { resourceId } = req.query;

    try {
      let resource = await Resource.findOne({ _id: resourceId });

      if (!resource) {
        return res.status(404).send({ message: "resource no encontrado!" });
      }
      // borro el elemento del array del grupo
      let group: IGroup = await Group.findOne({ _id: resource.group });

      console.log(group);
      group.resources = group.resources.filter(
        (resource) => resource.valueOf() !== resourceId
      );

      let groupUpdated = await Group.updateOne(
        { _id: resource.group },
        { $set: { resources: group.resources } }
      );
      if (!groupUpdated) {
        return res
          .status(404)
          .send({ message: "no se pudo eliminar el elemento del grupo" });
      }

      let resourceDeleted = await Resource.deleteOne({ _id: resourceId });

      if (resourceDeleted) {
        return res.json(resourceDeleted);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        message: error,
      });
    }
  }
}

export default new ResourceController();
