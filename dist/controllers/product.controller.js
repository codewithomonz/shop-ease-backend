import * as productService from "../services/product.service.js";
export async function getAllProducts(req, res) {
    const query = req.query;
    const products = await productService.listProducts(query);
    res.status(200).json({ success: true, data: products });
}
export async function getAllProductsByUserId(req, res) {
    const query = req.query;
    const products = await productService.listProducts({
        ...query,
        createdBy: req.params.userId,
    });
    res.status(200).json({ success: true, data: products });
}
export async function getProductById(req, res) {
    const product = await productService.getProduct(req.params.id);
    res.status(200).json({ success: true, data: product });
}
export async function createProduct(req, res) {
    const product = await productService.createProduct(req.body, req.user.userId);
    res.status(201).json({ success: true, data: product });
}
export async function updateProduct(req, res) {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ success: true, data: product });
}
export async function deleteProduct(req, res) {
    await productService.deleteProduct(req.params.id);
    res.status(204).send(); // 204 = success, no content
}
//# sourceMappingURL=product.controller.js.map