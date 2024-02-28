import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createLocation = mutation({
  args: {
    position: v.object({lat : v.number(), lng: v.number()}), 
    handle: v.string(),
    name: v.string(),
    info: v.string(), 
  },
  handler: async (ctx, args) => {
    const newLocationId = await ctx.db.insert("locations", {
      position: args.position,
      handle: args.handle,
      name: args.name,
      info: args.info,
    });
    return newLocationId;
  },
});

export const getLocations = query({
  handler: async (ctx) => {
    const locations = await ctx.db.query("locations").collect();
    
    return locations;
  },

})