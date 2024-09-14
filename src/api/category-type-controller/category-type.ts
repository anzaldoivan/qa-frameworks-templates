export async function CreateCategory(
  request,
  categoryName: string,
): Promise<Response> {
  const res = await request.post("/api/category-type/create", {
    data: {
      name: categoryName,
      root: true,
    },
  });
  return res;
}

export async function CreateSubCategory(
  request,
  categoryName: string,
  categoryParentId: string,
): Promise<Response> {
  const res = await request.post("/api/category-type/create", {
    data: {
      name: `${categoryName}-SubCategory`,
      parentId: categoryParentId,
      root: true,
    },
  });
  return res;
}

export async function GetCategoryId(
  request,
  categoryId: string,
): Promise<Response> {
  const res = await request.get(`/api/category-type/${categoryId}`);
  return res;
}

export async function GetCategories(request): Promise<Response> {
  const res = await request.get(`/api/category-type`);
  return res;
}
