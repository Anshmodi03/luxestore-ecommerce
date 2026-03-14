import { Request, Response, NextFunction } from 'express';
import { Address } from '../models/Address.model';

// GET /api/users/me/addresses
export async function getAddresses(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const addresses = await Address.find({ user: req.user!._id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ data: addresses });
  } catch (error) {
    next(error);
  }
}

// POST /api/users/me/addresses
export async function createAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { label, firstName, lastName, street, city, state, postalCode, country, isDefault } = req.body;

    // If setting as default, unset other defaults
    if (isDefault) {
      await Address.updateMany({ user: req.user!._id }, { isDefault: false });
    }

    const address = await Address.create({
      user: req.user!._id,
      label,
      firstName,
      lastName,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false,
    });

    res.status(201).json({ data: address });
  } catch (error) {
    next(error);
  }
}

// PUT /api/users/me/addresses/:id
export async function updateAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user!._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    res.json({ data: address });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/users/me/addresses/:id
export async function deleteAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await Address.findOneAndDelete({ _id: req.params.id, user: req.user!._id });
    if (!result) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    res.json({ message: 'Address deleted' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/users/me/addresses/:id/default
export async function setDefaultAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await Address.updateMany({ user: req.user!._id }, { isDefault: false });
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user!._id },
      { isDefault: true },
      { new: true }
    );
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    res.json({ data: address });
  } catch (error) {
    next(error);
  }
}
