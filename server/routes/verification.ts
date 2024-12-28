import express from 'express';
import { Social } from '../models/Social';

interface VerificationResult {
  status: 'CLEAN' | 'COPY_CAT';
  duplicateLinks: Record<string, string>;
}

const router = express.Router();

router.post('/verify-socials', async (req, res) => {
  try {
    const { tokenMint, socials } = req.body;
    const result: VerificationResult = {
      status: 'CLEAN',
      duplicateLinks: {}
    };

    let hasDuplicates = false;

    // Check each social link
    for (const [platform, link] of Object.entries(socials)) {
      if (!link) continue;

      // Clean the link (remove trailing slashes, normalize format)
      const cleanLink = link.toString().toLowerCase().replace(/\/+$/, '');
      
      // Try to find existing social link
      const existingSocial = await Social.findOne({ 
        link: cleanLink,
        firstSeenInToken: { $ne: tokenMint } // Exclude current token
      });

      if (existingSocial) {
        hasDuplicates = true;
        result.duplicateLinks[platform] = existingSocial.firstSeenInToken;
      }

      // Store the link regardless (for future checks)
      await Social.findOneAndUpdate(
        { link: cleanLink },
        { 
          link: cleanLink,
          type: platform,
          firstSeenInToken: tokenMint 
        },
        { upsert: true }
      );
    }

    result.status = hasDuplicates ? 'COPY_CAT' : 'CLEAN';
    res.json(result);
  } catch (error) {
    console.error('Error verifying socials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;